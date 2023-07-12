import { useState } from "react";

export default function AddChat({ handleNewChat }) {
  const [newUser, setNewUser] = useState("");

  const handleInput = (e) => {
    setNewUser(e.target.value);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) addNewChat();
  };

  const addNewChat = () => {
    if (newUser === "") return;
    handleNewChat(newUser);
    setNewUser("");
  };

  return (
    <div>
      <input
        type="text"
        name="new-chat"
        id="new-chat"
        className="name-input"
        value={newUser}
        onChange={(e) => handleInput(e)}
        onKeyUp={(e) => handleKeyUp(e)}
      />
      <button className="add-btn" onClick={() => addNewChat()}>
        Add +
      </button>
    </div>
  );
}
