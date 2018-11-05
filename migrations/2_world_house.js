const WorldHouse = artifacts.require('../contracts/WorldHouse.sol')

module.exports = function(deployer) {
  deployer.deploy(WorldHouse);
};
