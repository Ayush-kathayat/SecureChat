import React, { useState, useEffect, useContext } from "react";
import { Error } from "../src/components/index";
import { ChatAppContext } from "../context/ChatAppContext";

const Layout = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalError, setModalError] = useState(""); // New state for the error message in the modal
  const { error, setError } = useContext(ChatAppContext);

  useEffect(() => {
    if (error !== "") {
      setModalError(error); // Set the error message for the modal
      setModalOpen(true);
      setError(""); // Reset the error after it's been shown
    }
  }, [error, setError]);

  return (
    <>
      {modalOpen && (
        <Error
          error={modalError}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
      {children}
    </>
  );
};

export default Layout;
