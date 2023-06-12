// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KAF is ERC20 {
    constructor() ERC20("Kafrex", "KAF") {}

    function mint(uint256 num_token) public {
        _mint(msg.sender, num_token);
    }
}