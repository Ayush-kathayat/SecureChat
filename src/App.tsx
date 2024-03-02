import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
  
import All_Users from "./Pages/All_Users/users.tsx";
import Chat from "./Pages/Chat/chat.tsx";
import Contact from "./Pages/Contact/contact.tsx";
import FAQS from "./Pages/FAQs/faqs.tsx";
import Setting from "./Pages/Setting/setting.tsx";
import Terms from "./Pages/Terms_of_Use/tou.tsx";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<All_Users />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQS />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/terms_of_use" element={<Terms />} />
      </Routes>
    </Router>
  );
};

export default App;
