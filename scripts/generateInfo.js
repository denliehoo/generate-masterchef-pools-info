const GeneratePoolInfo = artifacts.require('GeneratePoolInfo')
const fs = require('fs')

module.exports = async (callback) => {
  /* await the relevant contracts to be deployed */
  const instance = await GeneratePoolInfo.deployed()

  /* gets the account addressess in the CLI/ganache GUI if required*/
  let accounts
  await web3.eth.getAccounts(function (err, res) {
    accounts = res
  })

  // change this to the according masterchef
  const MASTERCHEF_ADDRESS = '0x2b2929E785374c651a81A63878Ab22742656DcDd'
  let poolLength = await instance.getPoolLength(MASTERCHEF_ADDRESS)

  let content =
    '_pid;lpAddress;tok0address;token0Name;token0Symbol;tok1address;token1Name;token1Symbol'
  content += '\n'
  for (let i = 0; i < parseInt(poolLength); i++) {
    try {
      const poolInfo = await instance.getPoolInfo(
        MASTERCHEF_ADDRESS,
        i.toString(),
      )
      content +=
        poolInfo['0'].toString() +
        ';' +
        poolInfo['1'] +
        ';' +
        poolInfo['2'] +
        ';' +
        poolInfo['3'] +
        ';' +
        poolInfo['4'] +
        ';' +
        poolInfo['5'] +
        ';' +
        poolInfo['6'] +
        ';' +
        poolInfo['7']
      content += '\n'

      console.log('Done: ', i)
    } catch (err) {
      console.log('Error at: ', i)
      content += `${i}; error at the poolId. This might be a test token by the protocol. Check the protocol for poolId ${i} for more details`
      content += '\n'
    }
  }

  fs.writeFileSync('./poolInfo.txt', content, (err) => {
    if (err) {
      console.log(err)
      return
    }
  })
  callback()
}
