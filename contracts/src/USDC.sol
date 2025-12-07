// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title USDC
 * @notice USDC token contract for Quantum Markets
 * @dev Standard ERC20 token with 6 decimals (matching real USDC)
 * @dev Can be minted by owner for testing/deployment purposes
 */
contract USDC is ERC20, ERC20Burnable, Ownable {
    uint8 private constant _decimals = 6;

    event Mint(address indexed to, uint256 amount);
    event Burn(address indexed from, uint256 amount);

    constructor(address owner) ERC20("USD Coin", "USDC") Ownable(owner) {
        // No initial supply - mint as needed
    }

    /**
     * @notice Returns the number of decimals for the token
     * @return The number of decimals (6, matching real USDC)
     */
    function decimals() public pure override returns (uint8) {
        return _decimals;
    }

    /**
     * @notice Mint USDC tokens (owner only)
     * @param to Address to mint tokens to
     * @param amount Amount to mint (in 6 decimals)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
        emit Mint(to, amount);
    }

    /**
     * @notice Burn USDC tokens
     * @param amount Amount to burn (in 6 decimals)
     */
    function burn(uint256 amount) public override {
        super.burn(amount);
        emit Burn(msg.sender, amount);
    }

    /**
     * @notice Burn USDC tokens from a specific address
     * @param from Address to burn tokens from
     * @param amount Amount to burn (in 6 decimals)
     */
    function burnFrom(address from, uint256 amount) public override {
        super.burnFrom(from, amount);
        emit Burn(from, amount);
    }
}

