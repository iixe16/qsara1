import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import "../style/chatBot.css";
import ChatHistory from "../components/ChatHistory";
import Loading from "../components/Loading";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ تتبع الجلسة عند دخول الصفحة ومغادرتها
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🎟️ التوكن المرسل:", token);

    if (!token) {
      console.warn("❌ لا يوجد توكن، لم يتم بدء الجلسة.");
      return;
    }

    const startSession = async () => {
      try {
        console.log("📤 إرسال start-session...");
    
        const res = await fetch("https://qsara-backend.onrender.com/api/user/start-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ pageName: "Chatbot" }),
        });
    
        const data = await res.json();
    
        if (!res.ok) {
          console.error("❌ خطأ من السيرفر:", data);
        } else {
          console.log("✅ تم بدء الجلسة:", data);
        }
    
      } catch (error) {
        console.error("❌ فشل في بدء جلسة Chatbot:", error);
      }
    };
    
    const endSession = async () => {
      try {
        await fetch("http://localhost:5000/api/user/end-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("❌ فشل في إنهاء جلسة Chatbot:", error);
      }
    };

    startSession();
    window.addEventListener("beforeunload", endSession);

    return () => {
      endSession();
      window.removeEventListener("beforeunload", endSession);
    };
  }, []);

  // Gemini API
  const genAI = new GoogleGenerativeAI("AIzaSyCsZc6DYIj9v8PMQIBGRLTtxciumFOuqOE");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;

      const newChatHistory = [
        ...chatHistory,
        { sender: "User", message: userInput },
        { sender: "AI", message: response.text() },
      ];

      setChatHistory(newChatHistory);

      await fetch("http://localhost:5000/save-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatHistory: newChatHistory }),
      });
    } catch {
      console.error("❌ Error sending message");
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setChatHistory([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Chatbot</h1>
      <p className="chat-title">اهلا يمكنك سؤالي ماتريد انا هنا لمساعدتك</p>

      <div className="chat-history-container">
        <ChatHistory chatHistory={chatHistory} />
        <Loading isLoading={isLoading} />
      </div>

      <div className="input-container">
        <input
          type="text"
          className="user-input"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
          onKeyDown={handleKeyPress}
        />
        <button
          className="send-button"
          onClick={sendMessage}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
      <button className="clear-button" onClick={clearChat}>
        Clear Chat
      </button>
    </div>
  );
};

export default App;
