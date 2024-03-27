import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Auth from "./Pages/auth/auth";
import Home from "./Pages/home/home";
import Users from "./Pages/user/users";
import Settings from "./Pages/settings/settings";
import About from "./Pages/about/about";
import Connect from "./Pages/connect/connect";
import Layout from "../utils/layout"; // Import the Layout component

import { ChatAppProvider } from "../context/ChatAppContext";

const App = () => {
 return (
    <Router>
      <ChatAppProvider>
        <Routes>
          <Route path="/" element={<Layout><Auth /></Layout>} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/users" element={<Layout><Users /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/connect" element={<Layout><Connect /></Layout>} />
        </Routes>
      </ChatAppProvider>
    </Router>
 );
};

export default App;