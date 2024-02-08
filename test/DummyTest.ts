// test/Lock.test.ts

import { ethers, upgrades } from "hardhat";
import { expect } from "chai";
import {Contract, ContractRunner, Signer} from "ethers";
import {Address} from "../typechain-types";
import {loadFixture} from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Lock", function () {


  async function deploy1() {

    const Dummy = await ethers.getContractFactory("Dummy");
    const dummy = await upgrades.deployProxy(Dummy, [5], {initializer: "initialize", kind: "uups"});
    const [owner, addr1] = await ethers.getSigners();

    return {dummy, owner, addr1};
  }

  it("Should return the initial value", async function () {
    const {dummy, owner, addr1} = await loadFixture(deploy1);
    expect(await dummy.getNum()).to.equal(5);
  });



  it("Should upgrade contract", async function () {
    const {dummy, owner, addr1} = await loadFixture(deploy1);

    const Dummy2 = await ethers.getContractFactory("Dummy2");
    // @ts-ignore
    await upgrades.upgradeProxy(dummy, Dummy2);

    expect(await dummy.getNum()).to.equal(10);
  });




});
