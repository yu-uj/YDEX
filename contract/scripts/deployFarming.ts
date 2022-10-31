import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0].address;
  console.log('Sender address: ', deployer);

  // Deploy Dex Token
  const dexToken = await ethers.getContractFactory('PlatformToken');
  const dexTokenInstance = await dexToken.deploy();
  await dexTokenInstance.deployed();

  console.log(`Token deployed to : ${dexTokenInstance.address}`);

  // Deploy Farming
  const farming = await ethers.getContractFactory('Farming');
  const rewardPerBlock = ethers.utils.parseEther('1');
  const currentBlock = await ethers.provider.getBlockNumber();
  const farmingInstance = await farming.deploy(
    dexTokenInstance.address,
    rewardPerBlock,
    currentBlock + 1,
  );
  await farmingInstance.deployed();
  console.log(`Farming deployed to : ${farmingInstance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});