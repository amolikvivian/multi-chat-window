import PropTypes from "prop-types";
import { useState } from "react";

import moment from "moment";

import "./index.css";
import Chat from "../Chat";

export default function ChatWindow({
  user,
  messages,
  handleNewMessage,
  onTyping,
  typingStatus,
}) {
  const [newMessageText, setNewMessageText] = useState("");

  const handleInputChange = (e) => {
    setNewMessageText(e.target.value);
  };

  const sendMessage = () => {
    if (newMessageText === "") return;

    const messageId = Math.random() * 1000;

    const payload = {
      messageId,
      userId: user.userId,
      username: user.username,
      content: newMessageText,
      timestamp: moment().format("HH:mm"),
    };

    handleNewMessage(payload);
    setNewMessageText("");
  };

  const handleKeyUp = (e) => {
    onTyping({
      author: user.userId,
      username: user.username,
    });

    if (e.keyCode === 13) sendMessage();
  };

  const showTyping = () => {
    return typingStatus && typingStatus.author !== user.userId;
  };

  return (
    <div className="chat-window">
      <div className="header">{user.username}</div>

      <div className="message-container">
        {messages.map((message) => (
          <Chat message={message} user={user} key={message.messageId} />
        ))}

        {showTyping() ? (
          <div className="message">
            <div className="name-content">
              <div className="content">
                <span>{typingStatus.username} is typing...</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="new-message">
        <input
          type="text"
          name="new-message"
          id="new-message"
          className="message-input"
          placeholder="Type your message"
          value={newMessageText}
          onChange={(e) => handleInputChange(e)}
          onKeyUp={(e) => handleKeyUp(e)}
        />
        <button className="send-btn" onClick={() => sendMessage()}>
          Send
        </button>
      </div>
    </div>
  );
}

ChatWindow.propTypes = {
  user: PropTypes.object,
  messages: PropTypes.array,
  handleNewMessage: PropTypes.func,
  onTyping: PropTypes.func,
  typingStatus: PropTypes.object,
};
