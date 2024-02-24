import hre from "hardhat";

async function main() {
  const ethers = hre.ethers;
  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy();
  await lock.deployed();

  console.log(`Lock deployed to: ${lock.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
