// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/FabCoin.sol";

contract TestFabCoin {
    function testInitialBalanceUsingDeployedContract() public {
        FabCoin fabCoin = FabCoin(DeployedAddresses.FabCoin());

        Assert.equal(fabCoin.balanceOf(tx.origin), 0, "Owner should have 1 FabCoin initially.");
    }

    function testInitialBalanceUsingNewFabCoin() public {
        FabCoin fabCoin = new FabCoin(100);

        Assert.equal(fabCoin.balanceOf(tx.origin), 0, "Owner should have 1 FabCoin initially.");
    }

    function testIntialClaimUsingDeployedContract() public {
      FabCoin fabCoin = FabCoin(DeployedAddresses.FabCoin());
      fabCoin.claim();

      Assert.equal(fabCoin.balanceOf(address(this)), 1, "claim() grants 1 FabCoin on first call.");
    }

    function testIntialClaimUsingNewFabCoin() public {
      FabCoin fabCoin = new FabCoin(100);
      fabCoin.claim();

      Assert.equal(fabCoin.balanceOf(address(this)), 1, "claim() grants 1 FabCoin on first call.");
    }

    function testMultipleClaimUsingDeployedContract() public {
      FabCoin fabCoin = FabCoin(DeployedAddresses.FabCoin());

      // Deployed contract already has 1 FabCoin for this address from a
      // previous test.
      (bool success, ) = address(fabCoin).call(abi.encodeWithSignature("claim()"));
      Assert.isFalse(success, "Second call to claim() should revert.");

      Assert.equal(fabCoin.balanceOf(address(this)), 1, "claim() grants max 1 FabCoin per address.");
    }

    function testMultipleClaimUsingNewFabCoin() public {
      FabCoin fabCoin = new FabCoin(100);
      fabCoin.claim();

      (bool success, ) = address(fabCoin).call(abi.encodeWithSignature("claim()"));
      Assert.isFalse(success, "Second call to claim() should revert.");

      Assert.equal(fabCoin.balanceOf(address(this)), 1, "claim() grants max 1 FabCoin per address.");
    }

    function testClaimAfterTransferUsingDeployedContract() public {
      FabCoin fabCoin = FabCoin(DeployedAddresses.FabCoin());

      // Deployed contract already has 1 FabCoin for this address from a
      // previous test.
      fabCoin.transfer(tx.origin, 1);

      (bool success, ) = address(fabCoin).call(abi.encodeWithSignature("claim()"));
      Assert.isFalse(success, "Second call to claim() should revert.");

      Assert.equal(fabCoin.balanceOf(address(this)), 0, "claim() grants max 1 FabCoin per address.");
      Assert.equal(fabCoin.balanceOf(tx.origin), 1, "claim() grants max 1 FabCoin per address.");
    }

    function testClaimAfterTransferUsingNewFabCoin() public {
      FabCoin fabCoin = new FabCoin(100);
      fabCoin.claim();

      fabCoin.transfer(tx.origin, 1);

      (bool success, ) = address(fabCoin).call(abi.encodeWithSignature("claim()"));
      Assert.isFalse(success, "Second call to claim() should revert.");

      Assert.equal(fabCoin.balanceOf(address(this)), 0, "claim() grants max 1 FabCoin per address.");
      Assert.equal(fabCoin.balanceOf(tx.origin), 1, "claim() grants max 1 FabCoin per address.");
    }
}
