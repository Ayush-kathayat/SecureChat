/* eslint-disable @typescript-eslint/no-explicit-any */
// Import ethers.js for Ethereum interactions
import { ethers } from "ethers";

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

const provider = new ethers.BrowserProvider(window.ethereum);
// Function to check if a wallet is connected
export const checkWalletConnection = async (): Promise<Wallet | null> => {
  if (!window.ethereum) {
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
export const getContractInstance = (contract: Contract): ethers.Contract => {
  return new ethers.Contract(contract.address, contract.abi, provider);
};

export const convertTime = (time) => {
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
