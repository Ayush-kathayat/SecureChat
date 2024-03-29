import React from "react";
import "./error.css";
import { Button } from "../../components/index";

interface ErrorProps {
  error: string;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const Error: React.FC<ErrorProps> = ({ error, modalOpen, setModalOpen }) => {
  const handleClose = () => {
    setModalOpen(false);
  };

  return modalOpen ? (
    <>
      <div className="error-modal-wrapper" onClick={handleClose}></div>
      <div className="error-msg-wrapper">
        <h1 className="error-msg-title">{error}</h1>
        <p className="error-msg-description">
          Open metamask and switch to another account
        </p>
        <Button text="Try Again" onClick={handleClose} />
      </div>
    </>
  ) : null;
};

export default Error;
