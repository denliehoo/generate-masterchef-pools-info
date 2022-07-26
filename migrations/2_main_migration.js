const GeneratePoolInfo = artifacts.require('GeneratePoolInfo')

module.exports = function (deployer) {
  deployer.deploy(GeneratePoolInfo)
}
