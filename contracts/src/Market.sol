// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import {Id} from "./Id.sol";
import {MarketUtilsSwapHook} from "./MarketUtilsSwapHook.sol";
import {IMarket} from "./interfaces/IMarket.sol";
import {IMarketResolver} from "./interfaces/IMarketResolver.sol";
import {MarketStatus, MarketConfig, ProposalConfig} from "./common/MarketData.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {LiquidityAmounts} from "@uniswap/v4-periphery/src/libraries/LiquidityAmounts.sol";
import {IPoolManager} from "@uniswap/v4-core/src/PoolManager.sol";
import {IPoolInitializer_v4} from "@uniswap/v4-periphery/src/interfaces/IPoolInitializer_v4.sol";
import {IPositionManager} from "@uniswap/v4-periphery/src/PositionManager.sol";
import {PoolId, PoolIdLibrary} from "@uniswap/v4-core/src/types/PoolId.sol";
import {PoolKey} from "@uniswap/v4-core/src/types/PoolKey.sol";
import {Currency} from "@uniswap/v4-core/src/types/Currency.sol";
import {TickMath} from "@uniswap/v4-core/src/libraries/TickMath.sol";
import {Actions} from "@uniswap/v4-periphery/src/libraries/Actions.sol";
import {IPermit2} from "@uniswap/permit2/src/interfaces/IPermit2.sol";
import {IAllowanceTransfer} from "@uniswap/permit2/src/interfaces/IAllowanceTransfer.sol";
import {StateLibrary} from "@uniswap/v4-core/src/libraries/StateLibrary.sol";
import {UniswapV2Library} from "@uniswap/universal-router/contracts/modules/uniswap/v2/UniswapV2Library.sol";
import {FixedPointMathLib} from "solmate/src/utils/FixedPointMathLib.sol";
import {DecisionToken, TokenType, VUSD} from "./Tokens.sol";
import {IFlareHybridResolver, ResolutionConfig} from "./interfaces/IFlareHybridResolver.sol";
import {USDC} from "./USDC.sol";
import {PriceLibrary} from "./libraries/PriceLibrary.sol";

contract Market is IMarket, Ownable {
    using StateLibrary for IPoolManager;
    using PriceLibrary for *;

    Id public id;
    IPoolManager public immutable poolManager;
    IPositionManager public immutable positionManager;
    IPermit2 public immutable permit2;
    MarketUtilsSwapHook public immutable hook;
    USDC public immutable usdc; // Fixed USDC token for all markets

    uint24 public POOL_FEE = 3000;

    event MarketCreated(uint256 indexed marketId, uint256 createdAt, address creator, string title);
    event ProposalCreated(uint256 indexed marketId, uint256 indexed proposalId, uint256 createdAt, address creator);
    event MarketSettled(uint256 indexed marketId, bool passed);

    error MarketClosed();
    error ProposalNotTradable();
    error MarketNotSettled();

    struct MaxProposal {
        uint256 yesPrice;
        uint256 proposalId;
    }

    /**
     * @notice Proposal information structure for UI
     */
    struct ProposalInfo {
        uint256 id;
        uint256 createdAt;
        address creator;
        string title;
        address vusdAddress;
        address yesTokenAddress;
        address noTokenAddress;
        uint256 yesPrice; // 18 decimals
        uint256 noPrice; // 18 decimals
    }

    /**
     * @notice Proposal information with user balances for UI
     */
    struct ProposalInfoWithBalances {
        uint256 id;
        uint256 createdAt;
        address creator;
        string title;
        address vusdAddress;
        address yesTokenAddress;
        address noTokenAddress;
        uint256 yesPrice; // 18 decimals
        uint256 noPrice; // 18 decimals
        uint256 yesBalance; // User's YES balance (18 decimals)
        uint256 noBalance; // User's NO balance (18 decimals)
        uint256 vusdBalance; // User's VUSD balance (18 decimals)
        uint256 claimableVUSD; // User's claimable VUSD for this proposal (18 decimals)
    }

    mapping(uint256 => MarketConfig) public markets;
    mapping(uint256 => MaxProposal) public marketMax;
    mapping(uint256 => ProposalConfig) public proposals;
    mapping(uint256 => uint256) public acceptedProposals;
    mapping(uint256 => mapping(address => uint256)) public deposits;
    mapping(uint256 => mapping(address => uint256)) public proposalDepositClaims;
    mapping(PoolId => uint256) poolToProposal;
    mapping(uint256 => uint256[]) public marketProposals; // marketId => proposalIds[]

    modifier onlyHook() {
        _onlyHook();
        _;
    }

    function _onlyHook() internal view {
        require(msg.sender == address(hook), "must be hook");
    }

    constructor(
        address admin,
        address _poolManager,
        address _positionManager,
        address _permit2,
        address _swapHook,
        address _usdc
    ) Ownable(admin) {
        id = new Id();
        poolManager = IPoolManager(_poolManager);
        positionManager = IPositionManager(_positionManager);
        permit2 = IPermit2(_permit2);
        hook = MarketUtilsSwapHook(_swapHook);
        usdc = USDC(_usdc);
        hook.initialize(address(this));
    }

    function changeFee(uint24 newFee) external onlyOwner {
        POOL_FEE = newFee;
    }

    function depositToMarket(address depositor, uint256 marketId, uint256 amount) external {
        MarketConfig memory config = markets[marketId];
        if (
            config.status == MarketStatus.RESOLVED_YES || config.status == MarketStatus.RESOLVED_NO
                || config.status == MarketStatus.TIMEOUT
        ) {
            revert MarketClosed();
        }
        // All markets use USDC
        usdc.transferFrom(depositor, address(this), amount);
        deposits[marketId][depositor] += amount;
    }

    function claimVirtualTokenForProposal(address depositor, uint256 proposalId) external {
        ProposalConfig memory proposalConfig = proposals[proposalId];
        uint256 marketId = proposalConfig.marketId;
        uint256 totalDeposited = deposits[marketId][depositor];
        uint256 alreadyClaimed = proposalDepositClaims[proposalId][depositor];
        uint256 claimable = totalDeposited - alreadyClaimed;

        require(claimable > 0, "Nothing to claim");

        proposalDepositClaims[proposalId][depositor] += claimable;
        // Convert USDC (6 decimals) to VUSD (18 decimals): multiply by 1e12
        // 1 USDC = 1 VUSD
        proposalConfig.vUSD.mint(depositor, claimable * 1e12);
    }

    function mintYesNo(uint256 proposalId, uint256 amount) public {
        ProposalConfig memory config = proposals[proposalId];
        config.vUSD.transferFrom(msg.sender, address(this), amount);
        config.yesToken.mint(msg.sender, amount);
        config.noToken.mint(msg.sender, amount);
    }

    function redeemYesNo(uint256 proposalId, uint256 amount) external {
        ProposalConfig memory config = proposals[proposalId];
        config.yesToken.burnFrom(msg.sender, amount);
        config.noToken.burnFrom(msg.sender, amount);
        config.vUSD.transferFrom(address(this), msg.sender, amount);
    }

    function createMarket(address creator, address resolver, uint256 minDeposit, uint256 deadline, string memory title)
        external
        returns (uint256 marketId)
    {
        marketId = id.getId();

        markets[marketId] = MarketConfig({
            id: marketId,
            createdAt: block.timestamp,
            minDeposit: minDeposit,
            deadline: deadline,
            creator: creator,
            marketToken: address(usdc), // All markets use USDC
            resolver: resolver,
            status: MarketStatus.OPEN,
            title: title
        });

        emit MarketCreated(marketId, block.timestamp, creator, title);
    }

    function createProposal(uint256 marketId, string memory title) external {
        createProposalWithResolution(marketId, title, "");
    }

    function createProposalWithResolution(uint256 marketId, string memory title, bytes memory resolutionConfigData)
        public
    {
        MarketConfig memory marketConfig = markets[marketId];
        uint256 proposalId = id.getId();

        address depositor = msg.sender;
        uint256 totalDeposited = deposits[marketId][depositor];
        uint256 alreadyClaimed = proposalDepositClaims[proposalId][depositor];
        uint256 claimable = totalDeposited - alreadyClaimed;

        require(marketConfig.minDeposit <= claimable, "Must deposit min liquidity");
        proposalDepositClaims[proposalId][depositor] += marketConfig.minDeposit;

        // ─── split the deposit ──────────────────────────────────────────────────────
        uint256 D = marketConfig.minDeposit;
        uint256 burnTotal = (D * 2) / 3; // ⅔  → YES+NO tokens (in USDC 6 decimals)
        uint256 tokenPerPool = burnTotal / 2; // each pool gets D/3 tokens (in USDC 6 decimals)
        uint256 vusdToMint = D - burnTotal; // ⅓  → vUSD liquidity (in USDC 6 decimals)
        uint256 vusdPerPool = vusdToMint / 2; // each pool gets D/6 vUSD (in USDC 6 decimals)

        // ─── mint assets ───────────────────────────────────────────────────────────
        VUSD vUSD = new VUSD(address(this));
        // Convert USDC (6 decimals) to VUSD (18 decimals): multiply by 1e12
        // 1 USDC = 1 VUSD
        vUSD.mint(address(this), vusdToMint * 1e12);

        DecisionToken yesToken = new DecisionToken(TokenType.YES, address(this));
        DecisionToken noToken = new DecisionToken(TokenType.NO, address(this));

        // Convert tokenPerPool from USDC (6 decimals) to token (18 decimals): multiply by 1e12
        // 1 USDC worth of tokens = 1 token (in 18 decimals)
        uint256 tokenPerPool18 = tokenPerPool * 1e12;

        // tokens that seed the pools stay in the contract…
        yesToken.mint(address(this), tokenPerPool18);
        noToken.mint(address(this), tokenPerPool18);
        // …and the user receives their trading inventory
        yesToken.mint(msg.sender, tokenPerPool18);
        noToken.mint(msg.sender, tokenPerPool18);

        // ─── seed the two pools ────────────────────────────────────────────────────
        // Convert vusdPerPool from USDC (6 decimals) to VUSD (18 decimals): multiply by 1e12
        PoolKey memory yesPoolKey =
            _initializePoolWithLiquidity(address(yesToken), address(vUSD), tokenPerPool18, vusdPerPool * 1e12);
        PoolKey memory noPoolKey =
            _initializePoolWithLiquidity(address(noToken), address(vUSD), tokenPerPool18, vusdPerPool * 1e12);

        poolToProposal[PoolIdLibrary.toId(yesPoolKey)] = proposalId;
        poolToProposal[PoolIdLibrary.toId(noPoolKey)] = proposalId;

        // ─── record proposal ───────────────────────────────────────────────────────
        proposals[proposalId] = ProposalConfig({
            id: proposalId,
            marketId: marketId,
            createdAt: block.timestamp,
            creator: msg.sender,
            vUSD: vUSD,
            yesToken: yesToken,
            noToken: noToken,
            yesPoolKey: yesPoolKey,
            noPoolKey: noPoolKey,
            title: title
        });

        // ─── auto-configure resolution if resolver supports it ────────────────────
        if (resolutionConfigData.length > 0) {
            _autoConfigureResolution(marketConfig.resolver, proposalId, resolutionConfigData);
        }

        // Add proposal to market's proposal list
        marketProposals[marketId].push(proposalId);

        emit ProposalCreated(marketId, proposalId, block.timestamp, msg.sender);
    }

    /**
     * @notice Automatically configure resolution for a proposal if resolver supports it
     * @param resolver The resolver address
     * @param proposalId The proposal ID
     * @param resolutionConfigData Encoded ResolutionConfig data
     */
    function _autoConfigureResolution(address resolver, uint256 proposalId, bytes memory resolutionConfigData)
        internal
    {
        // Try to decode and set resolution config if resolver is FlareHybridResolver
        try IFlareHybridResolver(resolver).setResolutionConfig{gas: 500000}(
            proposalId, abi.decode(resolutionConfigData, (ResolutionConfig))
        ) {
        // Successfully configured
        }
            catch {
            // Resolver doesn't support auto-configuration or call failed
            // This is not an error - some resolvers (like BasicMarketResolver) don't support it
        }
    }

    function _initializePoolWithLiquidity(
        address tokenA, // decision token
        address tokenB, // vUSD
        uint256 budgetA, // decision tokens
        uint256 budgetB // vUSD
    )
        internal
        returns (PoolKey memory)
    {
        (address token0, address token1) = UniswapV2Library.sortTokens(tokenA, tokenB);

        PoolKey memory key = PoolKey({
            currency0: Currency.wrap(token0),
            currency1: Currency.wrap(token1),
            fee: POOL_FEE,
            tickSpacing: 60,
            hooks: hook
        });

        // ─── choose a tick range that brackets the launch price ──────────────────
        int24 spacing = 60;
        int24 tickLower;
        int24 tickUpper;
        uint256 priceX18;

        if (token0 == tokenA) {
            // decision / vUSD  (price ≤ 1)
            tickLower = (TickMath.MIN_TICK / spacing) * spacing;
            tickUpper = 0;
            priceX18 = 0.5e18; // 0.5 vUSD per decision
        } else {
            // vUSD / decision  (price ≥ 1)
            tickLower = 0;
            tickUpper = (TickMath.MAX_TICK / spacing) * spacing;
            priceX18 = 2e18; // 2 decision per vUSD
        }

        // snap launch tick to grid
        uint256 priceX96 = (priceX18 * (1 << 96)) / 1e18; // Q96 price
        uint160 sqrtPrice = uint160(FixedPointMathLib.sqrt(priceX96 << 96));
        int24 launchTick = TickMath.getTickAtSqrtPrice(sqrtPrice);
        int24 gridTick =
            launchTick >= 0 ? (launchTick / spacing) * spacing : ((launchTick - (spacing - 1)) / spacing) * spacing; // round down for negatives
        uint160 sqrtPriceX96 = TickMath.getSqrtPriceAtTick(gridTick);

        uint160 sqrtLower = TickMath.getSqrtPriceAtTick(tickLower);
        uint160 sqrtUpper = TickMath.getSqrtPriceAtTick(tickUpper);

        // budgets in (token0, token1) order
        uint256 amount0Max = (token0 == tokenA) ? budgetA : budgetB;
        uint256 amount1Max = (token1 == tokenA) ? budgetA : budgetB;

        uint128 liquidity =
            LiquidityAmounts.getLiquidityForAmounts(sqrtPriceX96, sqrtLower, sqrtUpper, amount0Max, amount1Max);

        // ─── multicall: init pool, then mint & settle ────────────────────────────
        bytes[] memory params = new bytes[](2);
        bytes[] memory mintParams = new bytes[](2);

        params[0] = abi.encodeWithSelector(IPoolInitializer_v4.initializePool.selector, key, sqrtPriceX96);

        bytes memory actions = abi.encodePacked(uint8(Actions.MINT_POSITION), uint8(Actions.SETTLE_PAIR));
        mintParams[0] =
            abi.encode(key, tickLower, tickUpper, liquidity, amount0Max, amount1Max, address(this), new bytes(0));
        mintParams[1] = abi.encode(key.currency0, key.currency1);

        params[1] = abi.encodeWithSelector(
            positionManager.modifyLiquidities.selector, abi.encode(actions, mintParams), block.timestamp + 60
        );

        _approveTokensForLiquidity(token0);
        _approveTokensForLiquidity(token1);
        positionManager.multicall(params);

        return key;
    }

    function _approveTokensForLiquidity(address token) internal {
        IERC20(token).approve(address(permit2), type(uint256).max);
        IAllowanceTransfer(address(permit2))
            .approve(token, address(positionManager), type(uint160).max, type(uint48).max);
    }

    function validateSwap(PoolKey calldata poolKey) external onlyHook {
        uint256 proposalId = poolToProposal[PoolIdLibrary.toId(poolKey)];
        ProposalConfig memory proposal = proposals[proposalId];
        MarketConfig memory marketConfig = markets[proposal.marketId];
        if (marketConfig.status != MarketStatus.OPEN) {
            revert ProposalNotTradable();
        }
    }

    function updatePostSwap(PoolKey calldata poolKey, int24 avgTick) external onlyHook {
        PoolId poolId = PoolIdLibrary.toId(poolKey);
        uint256 proposalId = poolToProposal[poolId];
        ProposalConfig storage proposal = proposals[proposalId];

        // only track the YES pool
        if (PoolId.unwrap(poolId) != PoolId.unwrap(PoolIdLibrary.toId(proposal.yesPoolKey))) return;

        uint256 raw = PriceLibrary.priceFromTick(avgTick); // token1 / token0
        uint256 yesPrice = PriceLibrary.yesPrice(poolKey, proposal, raw); // vUSD  /   YES

        // ─── record highest price so far ─────────────────────
        MaxProposal storage current = marketMax[proposal.marketId];
        if (yesPrice > current.yesPrice) {
            current.yesPrice = yesPrice;
            current.proposalId = proposalId;
        }

        // ─── graduate market if deadline crossed ───────────────
        MarketConfig storage market = markets[proposal.marketId];
        if (block.timestamp > market.deadline) graduateMarket(proposal.marketId);
    }

    function graduateMarket(uint256 marketId) public {
        MarketConfig storage marketConfig = markets[marketId];
        require(marketConfig.deadline < block.timestamp, "Market deadline not yet reached.");
        MaxProposal storage maxProposal = marketMax[marketId];
        marketConfig.status = MarketStatus.PROPOSAL_ACCEPTED;
        acceptedProposals[marketId] = maxProposal.proposalId;
    }

    function resolveMarket(uint256 marketId, bool yesOrNo, bytes memory proof) external {
        MarketConfig storage market = markets[marketId];
        require(market.status == MarketStatus.PROPOSAL_ACCEPTED);
        uint256 proposalId = acceptedProposals[marketId];
        IMarketResolver(market.resolver).verifyResolution(proposalId, yesOrNo, proof); // Should revert if verification fails.
        if (yesOrNo) {
            market.status = MarketStatus.RESOLVED_YES;
        } else {
            market.status = MarketStatus.RESOLVED_NO;
        }

        emit MarketSettled(marketId, yesOrNo);
    }

    function redeemRewards(uint256 marketId, address user) external {
        MarketConfig memory market = markets[marketId];
        uint256 winningProposalId = acceptedProposals[marketId];
        ProposalConfig memory proposal = proposals[winningProposalId];

        // VUSD balance is in 18 decimals, convert to USDC (6 decimals): divide by 1e12
        uint256 vusdBalance = proposal.vUSD.balanceOf(user);
        uint256 tradingRewards = vusdBalance / 1e12; // Convert VUSD (18 decimals) to USDC (6 decimals)
        proposal.vUSD.burnFrom(user, vusdBalance);

        if (market.status == MarketStatus.RESOLVED_YES) {
            uint256 tokenBalance = proposal.yesToken.balanceOf(user);
            proposal.yesToken.burnFrom(user, tokenBalance);
            // YES/NO tokens are in 18 decimals, convert to USDC (6 decimals): divide by 1e12
            tradingRewards += tokenBalance / 1e12;
        } else if (market.status == MarketStatus.RESOLVED_NO) {
            uint256 tokenBalance = proposal.noToken.balanceOf(user);
            proposal.noToken.burnFrom(user, tokenBalance);
            // YES/NO tokens are in 18 decimals, convert to USDC (6 decimals): divide by 1e12
            tradingRewards += tokenBalance / 1e12;
        } else {
            revert MarketNotSettled();
        }

        // All markets use USDC (6 decimals)
        usdc.transfer(user, tradingRewards);
    }

    /**
     * @notice Get current YES and NO prices for a proposal
     * @param proposalId The proposal ID
     * @return yesPrice Current YES price in VUSD (18 decimals)
     * @return noPrice Current NO price in VUSD (18 decimals)
     */
    function getProposalPrices(uint256 proposalId) external view returns (uint256 yesPrice, uint256 noPrice) {
        ProposalConfig memory proposal = proposals[proposalId];
        require(address(proposal.yesToken) != address(0), "Proposal not found");

        // Get YES pool state
        PoolId yesPoolId = PoolIdLibrary.toId(proposal.yesPoolKey);
        (uint160 sqrtPriceX96,,,) = poolManager.getSlot0(yesPoolId);
        uint256 rawYes = PriceLibrary.priceFromSqrtPrice(sqrtPriceX96);
        yesPrice = PriceLibrary.yesPrice(proposal.yesPoolKey, proposal, rawYes);

        // Get NO pool state
        PoolId noPoolId = PoolIdLibrary.toId(proposal.noPoolKey);
        (sqrtPriceX96,,,) = poolManager.getSlot0(noPoolId);
        uint256 rawNo = PriceLibrary.priceFromSqrtPrice(sqrtPriceX96);
        noPrice = PriceLibrary.noPrice(proposal.noPoolKey, proposal, rawNo);
    }

    /**
     * @notice Get user's deposit information for a proposal
     * @param proposalId The proposal ID
     * @param user The user address
     * @return totalDeposited Total USDC deposited by user in the market (6 decimals)
     * @return alreadyClaimed USDC already claimed/used for this proposal (6 decimals)
     * @return available Amount available to claim for this proposal (6 decimals)
     */
    function getUserDeposit(uint256 proposalId, address user)
        external
        view
        returns (uint256 totalDeposited, uint256 alreadyClaimed, uint256 available)
    {
        ProposalConfig memory proposal = proposals[proposalId];
        require(address(proposal.yesToken) != address(0), "Proposal not found");

        uint256 marketId = proposal.marketId;
        totalDeposited = deposits[marketId][user];
        alreadyClaimed = proposalDepositClaims[proposalId][user];
        available = totalDeposited > alreadyClaimed ? totalDeposited - alreadyClaimed : 0;
    }

    /**
     * @notice Get user's token balances for a proposal
     * @param proposalId The proposal ID
     * @param user The user address
     * @return yesBalance YES token balance (18 decimals)
     * @return noBalance NO token balance (18 decimals)
     * @return vusdBalance VUSD balance (18 decimals)
     */
    function getUserProposalBalances(uint256 proposalId, address user)
        external
        view
        returns (uint256 yesBalance, uint256 noBalance, uint256 vusdBalance)
    {
        ProposalConfig memory proposal = proposals[proposalId];
        require(address(proposal.yesToken) != address(0), "Proposal not found");

        yesBalance = proposal.yesToken.balanceOf(user);
        noBalance = proposal.noToken.balanceOf(user);
        vusdBalance = proposal.vUSD.balanceOf(user);
    }

    /**
     * @notice Get comprehensive proposal information for UI
     * @param proposalId The proposal ID
     * @return marketId The market ID this proposal belongs to
     * @return createdAt Timestamp when proposal was created
     * @return creator Address of proposal creator
     * @return title Proposal title
     * @return vusdAddress VUSD token address
     * @return yesTokenAddress YES token address
     * @return noTokenAddress NO token address
     * @return yesPrice Current YES price in VUSD (18 decimals)
     * @return noPrice Current NO price in VUSD (18 decimals)
     */
    function getProposalInfo(uint256 proposalId)
        external
        view
        returns (
            uint256 marketId,
            uint256 createdAt,
            address creator,
            string memory title,
            address vusdAddress,
            address yesTokenAddress,
            address noTokenAddress,
            uint256 yesPrice,
            uint256 noPrice
        )
    {
        ProposalConfig memory proposal = proposals[proposalId];
        require(address(proposal.yesToken) != address(0), "Proposal not found");

        marketId = proposal.marketId;
        createdAt = proposal.createdAt;
        creator = proposal.creator;
        title = proposal.title;
        vusdAddress = address(proposal.vUSD);
        yesTokenAddress = address(proposal.yesToken);
        noTokenAddress = address(proposal.noToken);

        // Get prices
        PoolId yesPoolId = PoolIdLibrary.toId(proposal.yesPoolKey);
        (uint160 sqrtPriceX96,,,) = poolManager.getSlot0(yesPoolId);
        uint256 rawYes = PriceLibrary.priceFromSqrtPrice(sqrtPriceX96);
        yesPrice = PriceLibrary.yesPrice(proposal.yesPoolKey, proposal, rawYes);

        PoolId noPoolId = PoolIdLibrary.toId(proposal.noPoolKey);
        (sqrtPriceX96,,,) = poolManager.getSlot0(noPoolId);
        uint256 rawNo = PriceLibrary.priceFromSqrtPrice(sqrtPriceX96);
        noPrice = PriceLibrary.noPrice(proposal.noPoolKey, proposal, rawNo);
    }

    /**
     * @notice Get user's complete position for a proposal (balances + deposit info)
     * @param proposalId The proposal ID
     * @param user The user address
     * @return yesBalance YES token balance (18 decimals)
     * @return noBalance NO token balance (18 decimals)
     * @return vusdBalance VUSD balance (18 decimals)
     * @return totalDeposited Total USDC deposited (6 decimals)
     * @return availableDeposit Available USDC to claim (6 decimals)
     */
    function getUserProposalPosition(uint256 proposalId, address user)
        external
        view
        returns (
            uint256 yesBalance,
            uint256 noBalance,
            uint256 vusdBalance,
            uint256 totalDeposited,
            uint256 availableDeposit
        )
    {
        ProposalConfig memory proposal = proposals[proposalId];
        require(address(proposal.yesToken) != address(0), "Proposal not found");

        // Get balances
        yesBalance = proposal.yesToken.balanceOf(user);
        noBalance = proposal.noToken.balanceOf(user);
        vusdBalance = proposal.vUSD.balanceOf(user);

        // Get deposit info
        uint256 marketId = proposal.marketId;
        totalDeposited = deposits[marketId][user];
        uint256 alreadyClaimed = proposalDepositClaims[proposalId][user];
        availableDeposit = totalDeposited > alreadyClaimed ? totalDeposited - alreadyClaimed : 0;
    }

    /**
     * @notice Get user's VUSD claimable amount and current balance for a proposal
     * @dev Returns both values in VUSD terms (18 decimals) for easy comparison
     * @param proposalId The proposal ID
     * @param user The user address
     * @return claimableVUSD Amount of VUSD user can claim (18 decimals)
     * @return currentVUSDBalance Current VUSD balance user has (18 decimals)
     */
    function getUserVUSDInfo(uint256 proposalId, address user)
        external
        view
        returns (uint256 claimableVUSD, uint256 currentVUSDBalance)
    {
        ProposalConfig memory proposal = proposals[proposalId];
        require(address(proposal.yesToken) != address(0), "Proposal not found");

        // Get current VUSD balance (already in 18 decimals)
        currentVUSDBalance = proposal.vUSD.balanceOf(user);

        // Get claimable amount in USDC (6 decimals) and convert to VUSD (18 decimals)
        uint256 marketId = proposal.marketId;
        uint256 totalDeposited = deposits[marketId][user];
        uint256 alreadyClaimed = proposalDepositClaims[proposalId][user];
        uint256 availableUSDC = totalDeposited > alreadyClaimed ? totalDeposited - alreadyClaimed : 0;

        // Convert USDC (6 decimals) to VUSD (18 decimals): multiply by 1e12
        claimableVUSD = availableUSDC * 1e12;
    }

    /**
     * @notice Get complete user information for a proposal (deposits, balances, prices)
     * @dev Returns all data needed for UI in a single call
     * @param proposalId The proposal ID
     * @param user The user address
     * @return marketDepositBalance Total USDC deposited in market (6 decimals)
     * @return claimableVUSD Amount of VUSD user can claim for this proposal (18 decimals)
     * @return currentVUSDBalance Current VUSD balance user has for this proposal (18 decimals)
     * @return yesBalance YES token balance (18 decimals)
     * @return noBalance NO token balance (18 decimals)
     * @return yesPrice Current YES price in VUSD (18 decimals)
     * @return noPrice Current NO price in VUSD (18 decimals)
     */
    function getUserProposalCompleteInfo(uint256 proposalId, address user)
        external
        view
        returns (
            uint256 marketDepositBalance,
            uint256 claimableVUSD,
            uint256 currentVUSDBalance,
            uint256 yesBalance,
            uint256 noBalance,
            uint256 yesPrice,
            uint256 noPrice
        )
    {
        ProposalConfig memory proposal = proposals[proposalId];
        require(address(proposal.yesToken) != address(0), "Proposal not found");

        uint256 marketId = proposal.marketId;

        // 1. Market deposit balance (USDC, 6 decimals)
        marketDepositBalance = deposits[marketId][user];

        // 2. Claimable VUSD (convert from USDC to VUSD)
        uint256 alreadyClaimed = proposalDepositClaims[proposalId][user];
        uint256 availableUSDC = marketDepositBalance > alreadyClaimed ? marketDepositBalance - alreadyClaimed : 0;
        claimableVUSD = availableUSDC * 1e12; // Convert to 18 decimals

        // 3. Current VUSD balance (18 decimals)
        currentVUSDBalance = proposal.vUSD.balanceOf(user);

        // 4. YES and NO token balances (18 decimals)
        yesBalance = proposal.yesToken.balanceOf(user);
        noBalance = proposal.noToken.balanceOf(user);

        // 5. YES and NO prices (18 decimals)
        PoolId yesPoolId = PoolIdLibrary.toId(proposal.yesPoolKey);
        (uint160 sqrtPriceX96,,,) = poolManager.getSlot0(yesPoolId);
        uint256 rawYes = PriceLibrary.priceFromSqrtPrice(sqrtPriceX96);
        yesPrice = PriceLibrary.yesPrice(proposal.yesPoolKey, proposal, rawYes);

        PoolId noPoolId = PoolIdLibrary.toId(proposal.noPoolKey);
        (sqrtPriceX96,,,) = poolManager.getSlot0(noPoolId);
        uint256 rawNo = PriceLibrary.priceFromSqrtPrice(sqrtPriceX96);
        noPrice = PriceLibrary.noPrice(proposal.noPoolKey, proposal, rawNo);
    }

    /**
     * @notice Get all available market IDs
     * @return marketIds Array of all market IDs that have been created
     */
    function getAllMarketIds() external view returns (uint256[] memory marketIds) {
        uint256 currentId = id.id();
        if (currentId == 0) {
            return new uint256[](0);
        }

        // Count valid markets (markets with non-zero ID)
        uint256 count = 0;
        for (uint256 i = 1; i <= currentId; i++) {
            if (markets[i].id != 0) {
                count++;
            }
        }

        // Populate array
        marketIds = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= currentId; i++) {
            if (markets[i].id != 0) {
                marketIds[index] = i;
                index++;
            }
        }
    }

    /**
     * @notice Get market information with all its proposals
     * @param marketId The market ID
     * @return market Market configuration
     * @return proposalIds Array of proposal IDs in this market
     * @return proposalData Array of proposal data (id, createdAt, creator, title, vusdAddress, yesTokenAddress, noTokenAddress, yesPrice, noPrice)
     */
    function getMarketInfoWithProposals(uint256 marketId)
        external
        view
        returns (MarketConfig memory market, uint256[] memory proposalIds, ProposalInfo[] memory proposalData)
    {
        market = markets[marketId];
        require(market.id != 0, "Market not found");

        // Get all proposal IDs for this market
        proposalIds = marketProposals[marketId];
        uint256 proposalCount = proposalIds.length;

        // Get proposal data with prices
        proposalData = new ProposalInfo[](proposalCount);
        for (uint256 i = 0; i < proposalCount; i++) {
            uint256 proposalId = proposalIds[i];
            ProposalConfig memory proposal = proposals[proposalId];

            // Get prices
            PoolId yesPoolId = PoolIdLibrary.toId(proposal.yesPoolKey);
            (uint160 sqrtPriceX96,,,) = poolManager.getSlot0(yesPoolId);
            uint256 rawYes = PriceLibrary.priceFromSqrtPrice(sqrtPriceX96);
            uint256 yesPrice = PriceLibrary.yesPrice(proposal.yesPoolKey, proposal, rawYes);

            PoolId noPoolId = PoolIdLibrary.toId(proposal.noPoolKey);
            (sqrtPriceX96,,,) = poolManager.getSlot0(noPoolId);
            uint256 rawNo = PriceLibrary.priceFromSqrtPrice(sqrtPriceX96);
            uint256 noPrice = PriceLibrary.noPrice(proposal.noPoolKey, proposal, rawNo);

            proposalData[i] = ProposalInfo({
                id: proposal.id,
                createdAt: proposal.createdAt,
                creator: proposal.creator,
                title: proposal.title,
                vusdAddress: address(proposal.vUSD),
                yesTokenAddress: address(proposal.yesToken),
                noTokenAddress: address(proposal.noToken),
                yesPrice: yesPrice,
                noPrice: noPrice
            });
        }
    }

    /**
     * @notice Get market information with all proposals, prices, and user balances in a single call
     * @dev Optimized function for frontend to get all data needed for market detail page
     * @param marketId The market ID
     * @param user The user address to get balances for
     * @return market Market configuration
     * @return userMarketDepositBalance User's total USDC deposit in this market (6 decimals)
     * @return proposalIds Array of proposal IDs in this market
     * @return proposalData Array of proposal data with prices and user balances
     */
    function getMarketInfoWithProposalsAndUserBalances(uint256 marketId, address user)
        external
        view
        returns (
            MarketConfig memory market,
            uint256 userMarketDepositBalance,
            uint256[] memory proposalIds,
            ProposalInfoWithBalances[] memory proposalData
        )
    {
        market = markets[marketId];
        require(market.id != 0, "Market not found");

        // Get user's total market deposit balance
        userMarketDepositBalance = deposits[marketId][user];

        // Get all proposal IDs for this market
        proposalIds = marketProposals[marketId];
        uint256 proposalCount = proposalIds.length;

        // Get proposal data with prices and user balances
        proposalData = new ProposalInfoWithBalances[](proposalCount);
        for (uint256 i = 0; i < proposalCount; i++) {
            uint256 proposalId = proposalIds[i];
            ProposalConfig memory proposal = proposals[proposalId];

            // Get prices
            PoolId yesPoolId = PoolIdLibrary.toId(proposal.yesPoolKey);
            (uint160 sqrtPriceX96,,,) = poolManager.getSlot0(yesPoolId);
            uint256 rawYes = PriceLibrary.priceFromSqrtPrice(sqrtPriceX96);
            uint256 yesPrice = PriceLibrary.yesPrice(proposal.yesPoolKey, proposal, rawYes);

            PoolId noPoolId = PoolIdLibrary.toId(proposal.noPoolKey);
            (sqrtPriceX96,,,) = poolManager.getSlot0(noPoolId);
            uint256 rawNo = PriceLibrary.priceFromSqrtPrice(sqrtPriceX96);
            uint256 noPrice = PriceLibrary.noPrice(proposal.noPoolKey, proposal, rawNo);

            // Get user balances
            uint256 yesBalance = proposal.yesToken.balanceOf(user);
            uint256 noBalance = proposal.noToken.balanceOf(user);
            uint256 vusdBalance = proposal.vUSD.balanceOf(user);

            // Calculate claimable VUSD for this proposal
            uint256 alreadyClaimed = proposalDepositClaims[proposalId][user];
            uint256 availableUSDC =
                userMarketDepositBalance > alreadyClaimed ? userMarketDepositBalance - alreadyClaimed : 0;
            uint256 claimableVUSD = availableUSDC * 1e12; // Convert to 18 decimals

            proposalData[i] = ProposalInfoWithBalances({
                id: proposal.id,
                createdAt: proposal.createdAt,
                creator: proposal.creator,
                title: proposal.title,
                vusdAddress: address(proposal.vUSD),
                yesTokenAddress: address(proposal.yesToken),
                noTokenAddress: address(proposal.noToken),
                yesPrice: yesPrice,
                noPrice: noPrice,
                yesBalance: yesBalance,
                noBalance: noBalance,
                vusdBalance: vusdBalance,
                claimableVUSD: claimableVUSD
            });
        }
    }

    /**
     * @notice Get all markets with their basic information for home page
     * @dev Optimized function to fetch all markets in a single call
     * @return marketIds Array of all market IDs
     * @return marketsData Array of market configurations
     */
    function getAllMarketsInfo() external view returns (uint256[] memory marketIds, MarketConfig[] memory marketsData) {
        uint256 currentId = id.id();
        if (currentId == 0) {
            return (new uint256[](0), new MarketConfig[](0));
        }

        // Count valid markets
        uint256 count = 0;
        for (uint256 i = 1; i <= currentId; i++) {
            if (markets[i].id != 0) {
                count++;
            }
        }

        // Populate arrays
        marketIds = new uint256[](count);
        marketsData = new MarketConfig[](count);
        uint256 index = 0;
        for (uint256 i = 1; i <= currentId; i++) {
            if (markets[i].id != 0) {
                marketIds[index] = i;
                marketsData[index] = markets[i];
                index++;
            }
        }
    }
}
