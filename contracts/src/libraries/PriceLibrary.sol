// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import {PoolKey} from "@uniswap/v4-core/src/types/PoolKey.sol";
import {Currency} from "@uniswap/v4-core/src/types/Currency.sol";
import {TickMath} from "@uniswap/v4-core/src/libraries/TickMath.sol";
import {ProposalConfig} from "../common/MarketData.sol";

library PriceLibrary {
    function priceFromTick(int24 tick) internal pure returns (uint256 pX18) {
        uint160 sqrtP = TickMath.getSqrtPriceAtTick(tick); // Q64.96
        uint256 p192 = uint256(sqrtP) * uint256(sqrtP); // Q128.192
        unchecked {
            pX18 = (p192 * 1e18) >> 192;
        } // to 1e18
    }

    function priceFromSqrtPrice(uint160 sqrtPriceX96) internal pure returns (uint256 pX18) {
        uint256 p192 = uint256(sqrtPriceX96) * uint256(sqrtPriceX96); // Q128.192
        unchecked {
            pX18 = (p192 * 1e18) >> 192;
        } // to 1e18
    }

    function yesPrice(
        PoolKey memory key,
        ProposalConfig memory p,
        uint256 raw // = priceFromTick(...) or priceFromSqrtPrice(...)
    ) internal pure returns (uint256) {
        bool yesIsToken0 = Currency.unwrap(key.currency0) == address(p.yesToken);
        return yesIsToken0 ? raw : (1e36 / raw); // keep 18-dec
    }

    function noPrice(
        PoolKey memory key,
        ProposalConfig memory p,
        uint256 raw // = priceFromSqrtPrice(...)
    ) internal pure returns (uint256) {
        bool noIsToken0 = Currency.unwrap(key.currency0) == address(p.noToken);
        return noIsToken0 ? raw : (1e36 / raw); // keep 18-dec
    }
}

