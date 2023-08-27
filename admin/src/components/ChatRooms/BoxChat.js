import { useEffect, useState } from "react";
import styles from "./Boxchat.module.css";
import { useSelector } from "react-redux";
import openSocket from "socket.io-client";
const BoxChat = (props) => {
  const [listMessage, setListMessage] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const userId = useSelector((state) => state.login.curUser?._id);
  const getListMessage = async () => {
    const response = await fetch(
      `http://localhost:5000/chat/getmessages/${props.roomId}`
    );
    const data = await response.json();
    setListMessage(data);
  };
  const changeInputHandler = (event) => {
    setMessageInput(event.target.value);
  };
  const sendMessageHandler = () => {
    if (messageInput.trim() && socket) {
      const dataMessage = {
        roomId: props.roomId,
        sender: "counselor",
        message: messageInput,
      };
      socket.emit("sendMessage", dataMessage);
      setMessageInput("");
    }
  };
  useEffect(() => {
    getListMessage();
    const socketconnect = openSocket("http://localhost:5000");
    socketconnect.emit("setRoom", { roomId: props.roomId });
    socketconnect.on("receiveMessage", (result) => {
      setListMessage(result.message);
    });
    setSocket(socketconnect);
  }, [props.roomId]);
  return (
    <div className={styles.boxChatContainer}>
      <div className={styles.displayList}>
        <ul className={styles.listMessage}>
          {listMessage.map((message) => (
            <li key={message._id} className={styles[message.sender]}>
              {`${message.sender === "client" ? "Client" : "You"}: ${
                message.text
              }`}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.chatInput}>
        <input
          placeholder="Type and Enter"
          value={messageInput}
          onChange={changeInputHandler}
        />
        <button onClick={sendMessageHandler}>send</button>
      </div>
    </div>
  );
};

export default BoxChat;
