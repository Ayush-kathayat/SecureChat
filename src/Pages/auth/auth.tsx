import "./auth.css";

import { ChatAppContext } from "../../../context/ChatAppContext";
import { useContext } from "react";


const Auth = () => {

  const lala = useContext(ChatAppContext);
  return (
    <>auth
    <h2>{lala}</h2>
    </>
  )
}

export default Auth;


// this is how easy it is to use context in react