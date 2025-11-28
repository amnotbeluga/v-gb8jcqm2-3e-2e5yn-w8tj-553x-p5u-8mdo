import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const Factory = await ethers.getContractFactory("TourismGuide");
  const contract = await Factory.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("TourismGuide deployed to:", address);

  fs.writeFileSync(
    "deployed-local.json",
    JSON.stringify({ address }, null, 2),
    "utf-8"
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
