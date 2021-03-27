const FabCoin = artifacts.require("FabCoin");

module.exports = function(deployer) {
    deployer.deploy(FabCoin, 100);
};
