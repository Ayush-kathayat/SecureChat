import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Auth from "./Pages/auth/auth";
import Home from "./Pages/home/home";
import Users from "./Pages/user/users";
import Settings from "./Pages/settings/settings";
import About from "./Pages/about/about";
import Connect from "./Pages/connect/connect";

import { ChatAppProvider } from "../context/ChatAppContext";

const App = () => {
 return (
    <Router>
      <ChatAppProvider>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </ChatAppProvider>
    </Router>
 );
};

export default App;
