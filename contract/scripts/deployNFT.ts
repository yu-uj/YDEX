import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const accounts = await ethers.getSigners();
  const deployer = accounts[0].address;
  console.log('Sender address: ', deployer);

  // Deploy YDEX NFT
  const YDEXNFT = await ethers.getContractFactory('YDEXNFT');
  const PlatformToken = '0xf2d5a9b9E7eC682aF9f353c6715DDf6b6393EE34'
  const YDEXNFTInstance = await YDEXNFT.deploy(PlatformToken);
  await YDEXNFTInstance.deployed();

  console.log(`YDEXNFT deployed to : ${YDEXNFTInstance.address}`);

  // Deploy Marketplace
  const Marketplace = await ethers.getContractFactory('Marketplace');
  const feePercent = 10;
  const MarketplaceInstance = await Marketplace.deploy(
    feePercent,
    YDEXNFTInstance.address,
  );
  await MarketplaceInstance.deployed();
  console.log(`Marketplace deployed to : ${MarketplaceInstance.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});