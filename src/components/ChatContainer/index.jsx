import { useEffect, useState } from "react";

import AddChat from "../AddChat";
import ChatWindow from "../ChatWindow";

import "./index.css";

export default function ChatContainer() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState(null);

  const addChat = (user) => {
    const randomId = Math.random() * 10;
    setUsers([...users, { userId: randomId, username: user }]);
  };

  const addMessage = (payload) => {
    setTypingStatus(null);
    setMessages([...messages, payload]);
  };

  const handleTyping = (payload) => {
    setTypingStatus(payload);
    setTimeout(() => {
      setTypingStatus(null);
    }, 2000);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  // Persist
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    const savedMessages = localStorage.getItem("messages");

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Setting local
  useEffect(() => {
    if (users.length) {
      localStorage.setItem("users", JSON.stringify(users));
    }
    if (messages.length) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [users, messages]);

  return (
    <div className="container">
      <AddChat handleNewChat={addChat} />

      <button
        style={{ width: "fit-content", marginTop: "12px" }}
        onClick={() => clearLocalStorage()}
      >
        Clear storage
      </button>

      <div className="chat-container">
        {users.map((user) => (
          <ChatWindow
            user={user}
            messages={messages}
            handleNewMessage={addMessage}
            key={user.userId}
            onTyping={handleTyping}
            typingStatus={typingStatus}
          />
        ))}
      </div>
    </div>
  );
}
