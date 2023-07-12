import "./index.css";

export default function Chat({ message, user }) {
  const isUserAuthor = () => {
    return message.userId === user.userId;
  };

  return (
    <div className="message">
      <div className="name-content">
        <span className="username">
          <b>
            {isUserAuthor() ? "You" : message.username}
            {":"}
          </b>
        </span>
        <div className="content">
          <span>{message.content}</span>
        </div>
      </div>
      <span className="timestamp">
        <i> {message.timestamp} </i>
      </span>
    </div>
  );
}
