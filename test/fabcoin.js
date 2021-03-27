const FabCoin = artifacts.require("FabCoin");

const expect = require('chai').expect;
const truffleAssert = require('truffle-assertions');

contract("FabCoin", accounts => {
  it("should put 0 FabCoin in the first account", async () => {
    let instance = await FabCoin.deployed();
    let balance = await instance.balanceOf(accounts[0]);
    expect(balance.toNumber()).to.equal(0);
  });

  it("should grant 1 FabCoin on claim()", async () => {
    let instance = await FabCoin.deployed();

    await instance.claim({
      from: accounts[0]
    });
    let balance = await instance.balanceOf(accounts[0]);
    expect(balance.toNumber()).to.equal(1);
  });

  context("after first call to claim()", async () => {
    it("should revert on second call to claim()", async () => {
      let instance = await FabCoin.deployed();

      // We already called claim() from this address in the previous test, so
      // calling claim() again will revert.
      truffleAssert.reverts(instance.claim({
        from: accounts[0]
      }));

      let balance = await instance.balanceOf(accounts[0]);
      expect(balance.toNumber()).to.equal(1);
    });

    it("should revert on second call to claim(), even with a zero balance",
      async () => {
        let instance = await FabCoin.deployed();

        // Transfer 1 FabCoin from account 0 to account 1;
        await instance.transfer(accounts[1], 1, {
          from: accounts[0]
        });

        let balance0 = await instance.balanceOf(accounts[0]);
        expect(balance0.toNumber()).to.equal(0);

        // We already called claim() from this address in the previous test, so
        // calling claim() again will revert, even if the balance is 0.
        truffleAssert.reverts(instance.claim({
          from: accounts[0]
        }));
      });
  });
})
