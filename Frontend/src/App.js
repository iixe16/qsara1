import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";  
import ForgotPassword from "./Pages/ForgotPassword";  
import ResetPassword from "./Pages/ResetPassword";
import ChatBot from "./Pages/ChatBot";
import Home from "./Pages/Home";
import Qoom from "./Pages/Qoom";
import Flashcard from "./Pages/Flashcard";
import Profile from "./Pages/Profile";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/ChatBot" element={<ChatBot />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Qoom" element={<Qoom/>} />
        <Route path="/Flashcard" element={<Flashcard />} />
        <Route path="/Profile" element={<Profile/>} />

      </Routes>
    </Router>
   
  );
   
}

export default App;
