import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// internal imports
import "./auth.css";
import { ChatAppContext } from "../../../context/ChatAppContext";
import { Button } from "..//../components/index";

// import { ChatAppContext } from "../../../context/ChatAppContext";

const Auth = () => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { account, createAccount } = useContext(ChatAppContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-left">
          <img
            className="hero-img"
            src="auth-1.svg"
            alt="Description of image"
          />
        </div>

        <div className="auth-right">
          <h1 className="title">WELCOME TO THE SECURE CHAT</h1>
          <p className="about">
            The go-to platform for effortless, blockchain-secure communication.
            Our app leverages blockchain technology to enhance your connections,
            ensuring privacy, security, and an unchangeable history of
            communication. Start your journey with us today and experience the
            future of secure, decentralized communication.
          </p>

          <div className="username-input-wrapper">
            <img className="user-icon" src="user.svg" alt="user" />
            <input
              type="text"
              className="username-input"
              spellCheck="false"
              placeholder="Enter your name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="address-input-wrapper">
            <img className="address-icon" src="key.svg" alt="user" />
            <input
              type="text"
              className="address-input"
              spellCheck="false"
              placeholder={account || "Enter your address"}
              onChange={(event) => setAccountAddress(event.target.value)}
            />
          </div>

          <div className="auth-btn-wrapper">
            <Button
              text="SUBMIT"
              onClick={() => createAccount({ name, accountAddress })}
            />

            <Button
              text="CANCEL"
              onClick={() => {
                navigate("/home");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
