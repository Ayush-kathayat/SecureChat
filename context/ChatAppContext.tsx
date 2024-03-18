import React, { useState, useEffect, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// internal imports

import {
  checkWalletConnection,
  connectWallet,
  getContractInstance,
} from "../utils/apiFeature";

interface AccountDetails {
  name: string;
  accountAddress: string;
}

interface Wallet {
  address: string;
  connected: boolean;
}

interface ChatAppContextType {
  readMessage: (friendAddress: string) => Promise<void>;
  createAccount: (accountDetails: AccountDetails) => Promise<void>;
  addFriends: (accountDetails: AccountDetails) => Promise<void>;
  sendMessage: (friendAddress: string, message: string) => Promise<void>;
  readUser: (userAddress: string) => Promise<void>;
  connectWallet: () => Promise<Wallet | null>;
  checkWalletConnection: () => Promise<Wallet | null>;
  account: string;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  friendList: string[];
  friendMsg: string[];
  loading: boolean;
  userLists: string[];
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>; // Add this line
  currentUsername: string;
  currentUserAddress: string;
}

export const ChatAppContext = createContext<ChatAppContextType | undefined>(
  undefined
);
// export const ChatAppContext = createContext({});

export const ChatAppProvider = ({ children }: { children: ReactNode }) => {
  //USE STATE
  const [account, setAccount] = useState("");
  const [username, setUsername] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  //Chat user data

  const [currentUsername, setCurrentUsername] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  //INTERFACE FOR ACCOUNT DETAILS
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    console.log("Component rendered");

    const fetchData = async () => {
      console.log("fetchData called");

      if (!dataFetched) {
        try {
          const contract = await getContractInstance();
          const connectAccount = await connectWallet();

          if (connectAccount !== null) {
            setAccount(connectAccount.address);
          }

          const userName = await contract.getUsername(connectAccount);
          if (userName !== null) {
            setUsername(userName);
          }

          const friendLists = await contract.getMyFriendList();
          if (friendLists !== null) {
            setFriendList(friendLists);
          }

          const userList = await contract.getAllAppUser();
          if (userList !== null) {
            setUserLists(userList);
          }

          setDataFetched(true);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, []);

  // this use effect is for checking the wallet connection and updating the account state
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      // When the accounts array is empty, it means the user has disconnected their wallet
      if (accounts.length === 0) {
        setAccount("");
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);
  // read message

  const readMessage = async (friendAddress: string) => {
    try {
      const contract = await getContractInstance();

      const read = await contract.readMessage(friendAddress);

      if (read !== null) {
        setFriendMsg(read);
      }
    } catch (error) {
      setError("Currently you have no messages");
    }
  };

  // create account

  const createAccount = async ({ name }: AccountDetails) => {
    try {
      // if (!name || !accountAddress)
      //   return setError("Please fill all the fields");
      const contract = await getContractInstance();

      const getCreatedUser = await contract.addUser(name);
      // setLoading(true);
      await getCreatedUser.wait();
      // setLoading(false);
      console.log(`User created successfully ${name}`);
      // window.location.reload();
    } catch (error) {
      if (!window.ethereum) {
        window.location.href = "/connect"; // Redirect to /connect
        console.log("Please install MetaMask or another Ethereum wallet.");
      }
      setError(error.reason || error.message || error.toString());

      console.log({ error });
    }
  };

  // add your Friends

  // Inside your component
  const navigate = useNavigate();

  const addFriends = async ({ name, accountAddress }: AccountDetails) => {
    try {
      if (!name || !accountAddress)
        return setError("Please fill all the fields");

      const contract = await getContractInstance();
      const addFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addFriend.wait();
      setLoading(false);
      // To navigate to "/home"
      navigate("/home");
      // window.location.reload();
    } catch (error) {
      setError("Error while adding friend reload the page and try again");
    }
  };

  // send message to friend

  const sendMessage = async (friendAddress: string, message: string) => {
    try {
      if (!friendAddress || !message)
        return setError("Please fill all the fields");

      const contract = await getContractInstance();
      const addMessage = await contract.sendMessage(friendAddress, message);

      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      // window.location.reload();
    } catch (error) {
      setError("Error while sending message reload the page and try again");
    }
  };

  // read the user info

  const readUser = async (userAddress: string) => {
    try {
      const contract = await getContractInstance();

      const userName = await contract.getUsername(userAddress);

      if (userName !== null) {
        setCurrentUsername(userName);
        setCurrentUserAddress(userAddress);
      }
    } catch (error) {
      setError("Currently you have no messages");
    }
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        checkWalletConnection,
        account,
        setAccount,
        username,
        friendList,
        friendMsg,
        loading,
        userLists,
        error,
        setError,
        currentUsername,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
