// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract FabCoin is ERC20Capped {
    mapping (address => bool) private _claimed;

    constructor (uint256 cap) ERC20("FabCoin", "FAB") ERC20Capped(cap) {}

    function claim() public {
        require(balanceOf(msg.sender) == 0 && !_claimed[msg.sender]);
        _mint(msg.sender, 1);
        _claimed[msg.sender] = true;
    }

    function remaining() public view returns (uint256) {
      return cap() - totalSupply();
    }

    function decimals() public view virtual override returns (uint8) {
        return uint8(0);
    }
}
