import hre from "hardhat";

async function main() {
  const ethers = hre.ethers;
  const ChatApp = await ethers.getContractFactory("ChatApp");
  const chat = await ChatApp.deploy();
  await chat.waitForDeployment();   //! deployed got depreciated we use waitForDeployment

  console.log("ChatApp deployed to:", chat.target );    //! chat.address got depreciated we use target 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
