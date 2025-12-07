// SPDX-License-Identifier: All Rights Reserved
pragma solidity ^0.8.26;

import {ERC20} from "solmate/src/tokens/ERC20.sol";
import {SafeTransferLib} from "solmate/src/utils/SafeTransferLib.sol";

/// @title WFLR - Wrapped Flare
/// @notice Minimalist and modern Wrapped Flare (FLR) implementation
/// @dev Compatible with WETH9 interface for Uniswap integration
contract WFLR is ERC20("Wrapped Flare", "WFLR", 18) {
    using SafeTransferLib for address;

    event Deposit(address indexed from, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount);

    /// @notice Deposit FLR to get WFLR
    function deposit() public payable virtual {
        _mint(msg.sender, msg.value);
        emit Deposit(msg.sender, msg.value);
    }

    /// @notice Withdraw WFLR to get FLR
    /// @param amount Amount of WFLR to withdraw
    function withdraw(uint256 amount) public virtual {
        _burn(msg.sender, amount);
        emit Withdrawal(msg.sender, amount);
        msg.sender.safeTransferETH(amount);
    }

    /// @notice Receive FLR and automatically wrap it
    receive() external payable virtual {
        deposit();
    }
}

