import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./Pages/landing/landing.tsx";
import Users from "./Pages/user/users.tsx";
import Chat from "./Pages/Chat/chat.tsx";

import Setting from "./Pages/Setting/setting.tsx";

const App = () => {
  return (
  

      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/users" element={<Users />} />   //! for only now just to check the nav bar cause the landing page is not yet created and it will not have the navbar
          <Route path="/chat" element={<Chat />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Router>
   
  );
};

export default App;
