import React, { useState, useEffect } from "react";
// import "./MainRight.css";
import baseUrl from "../../../api";

const ChatHeader = ({ friendName }: { friendName: string }) => {
  return (
    <div className="chat-header">
      <img src="your-image-url" alt="Avatar" className="avatar" />
      <h4>{friendName}</h4>
    </div>
  );
};

interface ChatMessageProps {
  sender: string;
  message: string;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  sender,
  message,
  timestamp,
}) => {
  return (
    <div className="chat-message">
      <span className="sender">{sender}</span>
      <p>{message}</p>
      <span className="timestamp">{timestamp}</span>
    </div>
  );
};

const ChatInput = () => {
  const [input, setInput] = useState("");

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi tin nhắn
    setInput("");
  };

  return (
    <div className="chat-input">
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Aa"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

const MainRight = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [friendName, setFriendName] = useState("");
  const [isVisible, setIsVisible] = useState(false); // State để điều khiển hiển thị

  useEffect(() => {
    const selectedFriendId = localStorage.getItem("selectedFriendId");
    const selectedFriendName = localStorage.getItem("selectedFriendName");

    if (selectedFriendId && selectedFriendName) {
      setFriendName(selectedFriendName);

      // Gọi API để lấy dữ liệu từ JSON
      const fetchData = async () => {
        try {
          const response = await baseUrl.get("User");
          const user = response.data.find((user: any) => user.id === 1);
          const friend = user.friends.find(
            (friend: any) => friend.userId.toString() === selectedFriendId
          );
          const chatData = friend.chat.map((chat: any) => ({
            sender: friend.userId === 1 ? "You" : selectedFriendName,
            message: chat.message,
            timestamp: new Date(chat.created_at).toLocaleString(),
          }));
          setMessages(chatData);
          setIsVisible(true); // Hiển thị khi có dữ liệu
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      fetchData();
    }
  }, []);

  if (!isVisible) {
    return null; // Ẩn component nếu không có dữ liệu hoặc khi không được chọn
  }

  return (
    <div className="main-right">
      <ChatHeader friendName={friendName} />
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            sender={msg.sender}
            message={msg.message}
            timestamp={msg.timestamp}
          />
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default MainRight;
