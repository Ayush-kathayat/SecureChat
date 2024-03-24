/* eslint-disable @typescript-eslint/no-explicit-any */
// Import ethers.js for Ethereum interactions
import { ethers } from "ethers";

// constant import of the address and the abi
import { ChatAppAddress, ChatAppAbi } from "../context/constant";
// Define the Wallet and Contract interfaces for type safety
export interface Wallet {
  address: string;
  connected: boolean;
}

export interface Contract {
  address: string;
  abi: any[]; // Replace 'any' with your specific ABI type if available
}

declare global {
  interface Window {
    ethereum: any; // You can replace 'any' with a more specific type if you have one
  }
}

//! below is my provider prolly the most important part of the code
// const provider = new ethers.BrowserProvider(window.ethereum);

// Function to check if a wallet is connected
export const checkWalletConnection = async (): Promise<Wallet | null> => {
  if (!window.ethereum) {
    window.location.href = "/connect"; // Redirect to /connect
    console.log("Please install MetaMask or another Ethereum wallet.");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length === 0) {
      console.log("No accounts connected. Please connect your wallet.");
      return null;
    }

    return { address: accounts[0], connected: true };
  } catch (error) {
    console.error("Failed to check wallet connection:", error);
    return null;
  }
};

// Function to connect the wallet
export const connectWallet = async (): Promise<Wallet | null> => {
  if (!window.ethereum) {
    window.location.href = "/connect"; // Redirect to /connect
    console.log("Please install MetaMask or another Ethereum wallet.");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length === 0) {
      console.log("Failed to connect wallet.");
      return null;
    }

   

    return { address: accounts[0], connected: true };
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    return null;
  }
};

// Function to get a contract instance

// dont try to export this below function it is just an internal function you know
//! nah nah export it
// export const getContractInstance = (): ethers.Contract => {
//   // console.log("ChatAppAddress:", ChatAppAddress);
//   // console.log("ChatAppAbi:", ChatAppAbi);
//   // console.log("Provider:", provider);

//   try {
//     const contract = new ethers.Contract(ChatAppAddress, ChatAppAbi, provider);
//     // console.log("Contract:", contract);
//     return contract;
//   } catch (error) {
//     console.error("Failed to create contract instance:", error);
//     throw error;
//   }
// };

export const convertTime = (time: any) => {
  const newTime = new Date(time.toNumber());

  const realTime =
    newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    " Date:" +
    newTime.getDate() +
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();
  return realTime;
};

// now below we will be connecting with our smart contract

// // Create a provider
// const provider = new ethers.JsonRpcProvider("http://localhost:8545");
// // Function to get a contract instance
// export const getContractInstance = async (): Promise<ethers.Contract> => {

//   try {
//     const signer = await provider.getSigner();
//     const contract = new ethers.Contract(ChatAppAddress, ChatAppAbi, signer);
//     return contract;
//   } catch (error) {
//     console.error("Failed to create contract instance:", error);
//     // window.location.href = "/connect"; // Redirect to /connect
//     throw error;
//   }
// };


// Function to get provider or signer and then get the contract instance
export async function getContractInstance() {
  // Assuming you have the contract address and ABI
  // const contractAddress = ChatAppAddress;
  // const contractABI = ChatAppAbi;

  if (!window.ethereum) {
    throw new Error('Ethereum provider is not available');
  }
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  const provider = new ethers.BrowserProvider(window.ethereum);

  // Get the signer from the provider
  const signer = await provider.getSigner();

  // Create a contract instance
  const contract = new ethers.Contract(ChatAppAddress, ChatAppAbi, signer);

  return contract;
}
