// import { useContext } from 'react';
import { useState, useContext } from "react";
import { UserCraft } from "..//..//components/index";

import { ChatAppContext } from "../../../context/ChatAppContext";

import "./home.css";
import Nav from "../../components/nav/nav";
// import { ChatAppContext } from '../../../context/ChatAppContext';

const Home = () => {
  // const title  = useContext(ChatAppContext);
  const [showAddFriend, setShowAddFriend] = useState(true);

  const { account, createAccount, error, setError, addFriends, friendList } =
    useContext(ChatAppContext);

  if (friendList && friendList.length > 0) {
    // setShowAddFriend(false);
    console.log(friendList[0][0] + " " + friendList[0][1]);
  }

  return (
    <div className="home-wrapper">
      <Nav />

      {friendList && friendList.length > 0 ? (
        <h1>
          hello bruh wait for my friend component and yeah congrats you have
          friends
        </h1>
      ) : (
        <UserCraft
          image="auth-1.svg"
          title="Discover and chat with friends easily."
          mainTitle=""
          placeholder1="Enter Your Friend's Name"
          placeholder2="Enter Your Friend's Public Address"
          icon1="user.svg"
          icon2="key.svg"
          buttonText="ADD FRIEND"
          onButtonClick={addFriends}
        />
      )}
    </div>
  );
};

export default Home;
