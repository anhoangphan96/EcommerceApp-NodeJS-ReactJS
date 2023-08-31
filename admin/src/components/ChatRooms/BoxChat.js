import { useEffect, useState } from "react";
import styles from "./Boxchat.module.css";
import { FcManager } from "react-icons/fc";
const BoxChat = (props) => {
  const [messageInput, setMessageInput] = useState("");
  const [messageTemp, setMessageTemp] = useState(null);
  const changeInputHandler = (event) => {
    setMessageInput(event.target.value);
  };
  const sendMessageHandler = () => {
    if (messageInput.trim() && props.socket) {
      const dataMessage = {
        roomId: props.roomId,
        sender: "counselor",
        message: messageInput,
      };
      props.socket.emit("sendMessage", dataMessage);
      setMessageInput("");
    }
  };
  useEffect(() => {
    if (props.roomId && props.socket) {
      props.socket.emit("setRoom", { roomId: props.roomId });
      props.socket.on("receiveMessage", (result) => {
        if (result) {
          setMessageTemp(result);
        }
      });
    } else return;
  }, [props.roomId]);
  useEffect(() => {
    if (props.clientId) {
      props.updateListMessage(messageTemp);
    }
  }, [messageTemp]);
  console.log(props.roomId);
  return (
    <div className={styles.boxChatContainer}>
      <div className={styles.displayList}>
        <ul className={styles.listMessage}>
          {props.listMessage.map((message) => (
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
        {props.roomId ? (
          <>
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
          </>
        ) : (
          <p className={styles.nofication}>Please select room first</p>
        )}
      </div>
    </div>
  );
};

export default BoxChat;
