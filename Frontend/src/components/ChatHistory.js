import React from "react";
import ReactMarkdown from "react-markdown";

const ChatHistory = ({ chatHistory }) => {
  return (
    <div className="chat-history-container">
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`chat-message ${
            message.type === "user" ? "user-message" : "bot-message"
          }`}
        >
          {message.type === "user" && (
            <span className="message-author user">You:</span>
          )}

          <div className={`message-text ${message.type}`}>
            <ReactMarkdown>{message.message}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
