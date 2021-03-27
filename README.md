# FabCoin
A fabulous ERC20 Token

## What is FabCoin?
FabCoin is an ERC20 token, whose supply is capped at 100. The only way to obtain a FabCoin is by claiming one (while supplies last) or from a transfer.

## How To Get FabCoin?
Your first FabCoin is free to claim (minus the gas price for the transaction).

### Claiming FabCoin
To claim a FabCoin you must invoke the claim fucntion on the FabCoin contract. The claim will be successful if your current balance is zero and you haven't claimed before.

## Interacting With The FabCoin Contract
There is a very simple site built with React for claiming a FabCoin (see app/), however it is not running.

You can still interact with the contract via [Remix IDE](remix.ethereum.org).
1. In the left nav bar, open the "Deploy And Run Transactions" Page. (Third icon from the top)
2. Select the "Environment"
    * If you're using a chrome extension like Metamask, you'll want to select "Injected Web3"
3. At the bottom you can input the contract's address for whichever network you're on and load the contract.
4. Once the contract is loaded, all of the contract's public functions are available to use.

## Contract Addresses
* Ethereum Mainnet: `0x0` (Gas prices to high to deploy to main 😭)
* Rinkeby Test Network: `0x978c578f8BE9cDB16bCc8B79D0DdA37C90367a7a`
