var Quiz = artifacts.require("./Quiz.sol");

module.exports = function(deployer) {
  deployer.deploy(Quiz, "0x55D93e5f2357D29f4E08a1d4c2209b80aAD8DB5A");
};
