import { createContext, ReactNode } from "react";


export const ChatAppContext = createContext("");

export const ChatAppProvider = ({ children }: { children: ReactNode }) => {

 const title = "Hey Welcome to blockchain chat APP";
 

 return (
    <ChatAppContext.Provider value={title}>
      {children}
    </ChatAppContext.Provider>
 );
};










// internal imports
// import {
//   checkWalletConnection,
//   connectWallet,
//   getContractInstance,
//   convertTime,
// } from "../utils/apiFeature";
