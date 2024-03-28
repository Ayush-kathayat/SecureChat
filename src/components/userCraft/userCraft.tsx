import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ChatAppContext } from "../../../context/ChatAppContext";
import { Button } from "..//../components/index";   

import "./userCraft.css"

interface AccountDetails {
  name: string;
  accountAddress: string;
}

interface UserCraftProps {
  image: string;
  title: string;
  mainTitle: string;
  placeholder1: string;
  placeholder2: string;
  icon1: string;
  icon2: string;
  buttonText: string;
  onButtonClick : (accountDetails: AccountDetails) => Promise<void>;

}

const UserCraft = ({image, title, mainTitle, icon1, icon2, buttonText, onButtonClick, placeholder1, placeholder2}: UserCraftProps) => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { account, createAccount, error, setError } =
    useContext(ChatAppContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-left">
          <img className="hero-img" src={image} alt="Description of image" />
        </div>

        <div className="auth-right">
          <h1 className="title">{title}</h1>
          <span className="main-title">{mainTitle}</span>

          <div className="username-input-wrapper">
            <img className="user-icon" src={icon1} alt="user" />
            <input
              type="text"
              className="username-input"
              spellCheck="false"
              placeholder={placeholder1}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="address-input-wrapper">
            <img className="address-icon" src={icon2} alt="user" />
            <input
              type="text"
              className="address-input"
              spellCheck="false"
              placeholder={placeholder2 || account || "Enter your address"}
              onChange={(event) => setAccountAddress(event.target.value)}
            />
          </div>

          <div className="auth-btn-wrapper">
          <Button text={buttonText} onClick={() => onButtonClick({name, accountAddress})} />

            <Button
              text="CANCEL"
              onClick={() => {
                navigate("/home");
              }}
            />

            {/* <Button
              text="GET USERNAME"
              onClick={getUSERNAME}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCraft;
