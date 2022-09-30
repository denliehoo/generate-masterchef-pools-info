# generate-masterchef-pools-info

Dependencies required:

1. node .js
   --> install from website
2. ganache-cli
   npm i -g ganache-cli
   3.truffle
   npm i -g truffle

# Steps:

// starts the blockchain fork locally
Note: use the relevant network node url for the relevant protocol
e.g. for pancakeswap, we need to get access to a ftm node and fork the blockchain
* ganache-cli --fork nodeEndPointURLHere

// compile and migrate (if havent done so)
truffle compile
truffle migrate

// change the masterchef contract address in this file (MASTERCHEF_ADDRESS)

// run this line to generae info
truffle exec scripts/generateInfo.js

Note: there might be errors. if there is, check the poolId
in the masterchef contract ; e.g. for pid 66 for spookyswap masterchef
the to LP token address is actually an ERC20 token and not a lp pair

# Code demonstrates:

1. How to use interfaces in solidity
2. How to create a local fork of the blockchain
3. How to use scripts in solidity
4. How to write to files in javascript
