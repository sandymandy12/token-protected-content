const { ethers } = require("hardhat");

// *** FIX THIS ***
const OWNER_ADDR = "0x1b79A2a8a18F8A19d786A1796BaAE26f9779b22E";
const tokenName = "PsyborgToken";

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const tokenContract = await deployments.get(tokenName);
  const token = await ethers.getContractAt(tokenName, tokenContract.address);
  const vendorContract = await deploy("Vendor", {
    from: deployer,
    args: [tokenContract.address],
    log: true,
  });
  console.log("\n Sending tokens to the vendor and to the owner...\n");
  await token.transfer(
    vendorContract.address,
    ethers.utils.parseEther("500000")
  );
  await token.transfer(OWNER_ADDR, ethers.utils.parseEther("500000"));
  console.log("\n Transfer ownership to frontend address...\n");
  const vendor = await ethers.getContractAt("Vendor", vendorContract.address);
  await vendor.transferOwnership(OWNER_ADDR);
};
module.exports.tags = ["Vendor"];
