const GreyhoundFactory = artifacts.require("GreyhoundFactory");

module.exports = function(deployer) {
  deployer.deploy(GreyhoundFactory);
};
