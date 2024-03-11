import { useState, useEffect, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// internal imports

import {
  connectWallet,
  getContractInstance,
} from "../utils/apiFeature";

interface AccountDetails {
  name: string;
  accountAddress: string;
}

export const ChatAppContext = createContext({});

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

  // fetch DATA TIME OF PAGE LOAD

  const fetchData = async () => {
    try {
      //get contract
      const contract = getContractInstance();

      //get account
      const connectAccount = await connectWallet();

      if (connectAccount !== null) {
        setAccount(connectAccount.address);
      }

      //get username
      const userName = await contract.getUsername(connectAccount);

      if (userName !== null) {
        setUsername(userName);
      }

      //get the friend list

      const friendLists = await contract.getMyFriendList();

      if (friendLists !== null) {
        setFriendList(friendLists);
      }

      // get all the users

      const userList = await contract.getAllAppUser();

      if (userList !== null) {
        setUserLists(userList);
      }
    } catch (error) {
      setError("Please install metamask and connect your wallet");
    }
  };

  useEffect(() => {
    fetchData();
  });

  // read message

  const readMessage = async (friendAddress: string) => {
    try {
      const contract = getContractInstance();

      const read = await contract.readMessage(friendAddress);

      if (read !== null) {
        setFriendMsg(read);
      }
    } catch (error) {
      setError("Currently you have no messages");
    }
  };

  // create account

  const createAccount = async ({ name, accountAddress }: AccountDetails) => {
    try {
      if (!name || !accountAddress)
        return setError("Please fill all the fields");

      const contract = getContractInstance();
      const getCreatedUser = await contract.addUser(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while creating account reload the page and try again");
    }
  };

  // add your Friends

  // Inside your component
  const navigate = useNavigate();

  const addFriends = async ({ name, accountAddress }: AccountDetails) => {
    try {
      if (!name || !accountAddress)
        return setError("Please fill all the fields");

      const contract = getContractInstance();
      const addFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addFriend.wait();
      setLoading(false);
      // To navigate to "/home"
      navigate("/home");
      window.location.reload();
    } catch (error) {
      setError("Error while adding friend reload the page and try again");
    }
  };

  // send message to friend

  const sendMessage = async (friendAddress: string, message: string) => {
    try {
      if (!friendAddress || !message)
        return setError("Please fill all the fields");

      const contract = getContractInstance();
      const addMessage = await contract.sendMessage(friendAddress, message);

      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while sending message reload the page and try again");
    }
  };

  // read the user info

  const readUser = async (userAddress: string) => {
    try {
      const contract = getContractInstance();

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
        account,
        username,
        friendList,
        friendMsg,
        loading,
        userLists,
        error,
        currentUsername,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
