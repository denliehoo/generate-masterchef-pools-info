// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// for masterchef contract
interface IMasterChef {
    function poolInfo(uint256 _pid)
        external
        view
        returns (
            address, //lp token
            uint256,
            uint256,
            uint256
        );
        
    function poolLength() external view returns (uint256);
        
    }
    

// for the liquidity pool pair
interface IPair {
    function token0() external view returns (address);

    function token1() external view returns (address);
}

// for the ERC20
interface IERC20 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
}

contract GeneratePoolInfo {
    
    function getPoolLength(address masterChefAddress) external view returns (uint256){
        return IMasterChef(masterChefAddress).poolLength();
    }

    function getPoolInfo(address masterChefAddress, uint256 _pid) external view returns(
    uint256 ,address,
    address, string memory, string memory, 
    address, string memory, string memory){
        (address lpAddress,,,) = IMasterChef(masterChefAddress).poolInfo(_pid);
        (address tok0address) = IPair(lpAddress).token0();
        (address tok1address) = IPair(lpAddress).token1();

        (string memory token0Name) = IERC20(tok0address).name();
        (string memory token0Symbol) = IERC20(tok0address).symbol();

        (string memory token1Name) = IERC20(tok1address).name();
        (string memory token1Symbol) = IERC20(tok1address).symbol();

        return (_pid, lpAddress, tok0address, token0Name, token0Symbol, tok1address, token1Name, token1Symbol);
    }

}