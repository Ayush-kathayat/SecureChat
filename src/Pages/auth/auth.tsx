import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// internal imports
import "./auth.css";
import { ChatAppContext } from "../../../context/ChatAppContext";
import { Button, Error } from "..//../components/index";

// import { ChatAppContext } from "../../../context/ChatAppContext";

const Auth = () => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  // const [modalOpen, setModalOpen] = useState(false);
  // const [modalError, setModalError] = useState(""); // New state for the error message in the modal

  const { account, createAccount, error, setError } =
    useContext(ChatAppContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (error !== "") {
  //     setModalError(error); // Set the error message for the modal
  //     setModalOpen(true);
  //     setError(""); // Reset the error after it's been shown
  //   }
  // }, [error, setError]);

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
          <h1 className="title">WELCOME TO THE </h1>
          <span className="main-title">SECURE CHAT</span>
          {/* <p className="about">
            The go-to platform for effortless, blockchain-secure communication.
            Our app leverages blockchain technology to enhance your connections,
            ensuring privacy, security, and an unchangeable history of
            communication. Start your journey with us today and experience the
            future of secure, decentralized communication.
          </p> */}

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
            <Button text="SUBMIT" onClick={() => createAccount({ name })} />

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
      {/* {modalOpen && (
        <Error
          error={modalError}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )} */}
      {/* <Error error={"User Already Exists"} modalOpen={true} setModalOpen={setModalOpen} /> */}
    </>
  );
};

export default Auth;
