/**
 * @Desc : Blockchain에서 데이터 수집
 */

const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");
const { testContractAbi, singlePoolAbi, farmingPoolAbi } = require("../Abi");

// model
const PairPool = require("../Model/PairPool");
const SinglePool = require("../Model/StakedToken");
const PriceOracle = require("../Model/PriceOracle");
const { Error } = require("mongoose");

// addresss
const yktokenAddr = '0xaa80658f5a86562f07BdF7caD649299BA3997036'
const yjtokenAddr ='0xd7877710190E492561F692a08117c63e32cf8ac1'
const farmingAddress = "0x7f0AF6ae4B64014025b56086293515250bC8D007";

// contract
const ykPoolContract = new caver.klay.Contract(singlePoolAbi, yktokenAddr);
const farmingContract = new caver.klay.Contract(farmingPoolAbi, farmingAddress);

/**
 * @Dev Single Pool totalStakedToken
 */

// const yjPoolContract = new caver.klay.Contract(singlePoolAbi, yjtokenAddr );

// ykPoolContract.methods.balanceOf(yktokenAddr).call().then(res=>console.log(res))

const singlePoolTotalStaked = async () => {
  try {
    const SinglePoolFound = await SinglePool.findOne({
      // token_address: yktokenAddr,
      token_address:"0x1234"
    });

    if(SinglePoolFound){

      const SinglePoolInfo = await ykPoolContract.methods.pool().call();
  
      await SinglePoolFound.updateOne({
        totalStaked: await caver.utils.fromPeb(SinglePoolInfo.totalStaked, "KLAY"),
      });
    }
    
  } catch (error) {
    // throw new Error(error);
    console.error(error);
  }
};

/**
 * @Dev PairStakedTokenAmount
 */

const PairPoolTotalStatked = async () => {
  try {
    const poolLength = await farmingContract.methods.poolLength().call();
    
    for(let i=0; i<poolLength; i++){
      const value = await farmingContract.methods.poolInfo(i).call();
      console.log(value);
      
      const PoolFound = await PairPool.findOne({pair_address:value.lpToken})

      if(PoolFound) {
        await PoolFound.updateOne({totalStaked:value.totalStaked})
      }

    }
  } catch (error) {
    console.error(error);
  }
}


/*
// const testContractAddr = "0x0e16D3b76d64AD7AdB01DC4aDDbCA4f16F7B6E5E";

// const testContract = new caver.klay.Contract(testContractAbi, testContractAddr);

// // testContract.methods
// //   .retrieve()
// //   .call()
// //   .then((res) => console.log(res));

// const yktokenAddr = "0xa7AdB3953C03Ee7Cca887cEFE35266a0b5F1e45d";
// const yjtokenAddr = "0xd7877710190E492561F692a08117c63e32cf8ac1";
 */

module.exports = {
  PairPoolTotalStatked,
  singlePoolTotalStaked,
};
