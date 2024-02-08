// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract Dummy2 is OwnableUpgradeable, UUPSUpgradeable {
    uint private _num;

    function initialize(uint num) initializer public {
        __Ownable_init(msg.sender);
        _num = num;
    }

    function getNum() public view returns (uint) {
        return 2 * _num;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

}
