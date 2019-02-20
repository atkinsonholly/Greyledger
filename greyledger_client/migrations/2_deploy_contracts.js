const NewGreyhound = artifacts.require("NewGreyhound");

module.exports = function(deployer) {
  deployer.deploy(NewGreyhound);
};
