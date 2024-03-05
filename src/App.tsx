import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Auth from "./Pages/auth/auth";
import Home from "./Pages/home/home";
import Users from "./Pages/user/users"; 
import Settings from "./Pages/settings/settings";
import About from "./Pages/about/about";


const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users/>} / >
          <Route path="/settings" element={<Settings/>} / >
          <Route path="/about" element={<About/>} / >
        </Routes>
      </Router>
   
  );
};

export default App;
