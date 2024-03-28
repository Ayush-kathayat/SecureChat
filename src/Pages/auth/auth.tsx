// internal imports
import { useContext } from "react";
import "./auth.css";
import { UserCraft } from "..//..//components/index";

import { ChatAppContext } from "../../../context/ChatAppContext";

const Auth = () => {
  const { account, createAccount, error, setError } =
    useContext(ChatAppContext);
  return (
    <>
      <UserCraft
        image="auth-1.svg"
        title="WELCOME TO  "
        mainTitle="SECURE CHAT"
        placeholder="Enter your name"
        icon1="user.svg"
        icon2="key.svg"
        buttonText="SUBMIT"
        onButtonClick={createAccount}
      />
    </>
  );
};

export default Auth;
