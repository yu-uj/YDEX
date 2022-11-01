import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0].address;
  console.log('Sender address: ', deployer);

  // Deploy PriceOracle
  const PriceOracle = await ethers.getContractFactory('PriceOracle');
  const PriceOracleInstance = await PriceOracle.deploy();
  await PriceOracleInstance.deployed();

  console.log(`PriceOracle deployed to : ${PriceOracleInstance.address}`);

  // Deploy Bank
  const Bank = await ethers.getContractFactory('Bank');
  const PlatformToken = '0xf2d5a9b9E7eC682aF9f353c6715DDf6b6393EE34'
  const BankInstance = await Bank.deploy(
    PriceOracleInstance.address,
    PlatformToken
  );
  await BankInstance.deployed();
  console.log(`Bank deployed to : ${BankInstance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});