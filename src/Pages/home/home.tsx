// import { useContext } from 'react';
import { useContext } from "react";
import { UserCraft } from "..//..//components/index";

import { ChatAppContext } from "../../../context/ChatAppContext";

import "./home.css";
import Nav from "../../components/nav/nav";
// import { ChatAppContext } from '../../../context/ChatAppContext';

const Home = () => {
  // const title  = useContext(ChatAppContext);

  const { account, createAccount, error, setError, addFriends} =
    useContext(ChatAppContext);
  return (
    <>
      <Nav />
      <UserCraft
        image="auth-1.svg"
        title="Discover and chat with friends easily."
        mainTitle=""
        placeholder="Enter your friend's name"
        icon1="user.svg"
        icon2="key.svg"
        buttonText="ADD FRIEND"
        onButtonClick={addFriends}
      />
      {/* <h1>{title}</h1> */}
    </>
  );
};

export default Home;
