import { useEffect, useState } from "react";
import styles from "./Boxchat.module.css";
import { useSelector } from "react-redux";
import openSocket from "socket.io-client";
import { FcManager } from "react-icons/fc";
const BoxChat = (props) => {
  const [listMessage, setListMessage] = useState([]);
  const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const getListMessage = async () => {
    const response = await fetch(
      `http://localhost:5000/chat/getmessages/${props.clientId}`
    );
    const data = await response.json();
    setListMessage(data.message);
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
    const socketconnect = openSocket("http://localhost:5000");
    setSocket(socketconnect);
    socketconnect.on("haveNewRoom", (data) => {
      props.checkListRoom(data);
      socketconnect.emit("setRoom", { roomId: data });
    });
    socketconnect.on("endRoom", (result) => {
      setListMessage([]);
      props.getListRooms();
    });
  }, []);
  useEffect(() => {
    if (props.roomId && socket) {
      getListMessage();
      socket.emit("setRoom", { roomId: props.roomId });
      socket.on("receiveMessage", (result) => {
        console.log(result.clientId);
        console.log(props.clientId);
        if (result.clientId === props.clientId) setListMessage(result.message);
      });
    } else return;
  }, [props.roomId]);

  return (
    <div className={styles.boxChatContainer}>
      <div className={styles.displayList}>
        <ul className={styles.listMessage}>
          {listMessage.map((message) => (
            <li key={message._id} className={styles[message.sender]}>
              {message.sender === "client" && <FcManager />}
              <div>
                {`${message.sender === "client" ? "Client" : "You"}: ${
                  message.text
                }`}
              </div>
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
        <button onClick={sendMessageHandler} className={styles.sendBtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-brand-telegram"
            viewBox="0 0 24 24"
            stroke-width={2}
            stroke="currentColor"
            fill="white"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BoxChat;
