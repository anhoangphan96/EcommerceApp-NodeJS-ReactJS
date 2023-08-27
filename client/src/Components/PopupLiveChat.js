import React, { useState, useEffect } from "react";
import styles from "./PopupLiveChat.module.css";
import { FcManager } from "react-icons/fc";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Shake from "./Transitions/Shake";
import { useSelector } from "react-redux";
import openSocket from "socket.io-client";
import uuid4 from "uuid4";
function PopupLiveChat(props) {
  const [messageInput, setMessageInput] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const [socket, setSocket] = useState(null);
  const curUser = useSelector((state) => state.login.curUser);
  const userId = curUser ? curUser._id : "";
  const listRoomId = JSON.parse(localStorage.getItem("listRoom")) ?? [];
  //Tìm số phòng hiện tại mà user đang tham gia chat còn đang open
  let curRoomId = listRoomId.find((room) => room.clientId === userId)?.roomId;
  console.log(curRoomId);
  // state quản lý nội dung chat hiển thị mặc định
  const [state, setState] = useState({
    isOpen: false,
  });
  const getListMessage = async () => {
    const response = await fetch(
      `http://localhost:5000/chat/getmessages/${curRoomId}`
    );
    const data = await response.json();
    setListMessage(data);
  };
  const messageChangeHandler = (event) => {
    setMessageInput(event.target.value);
  };
  //Function quản lý hành động click để mở hay đóng popup chat
  const sendMessageHandler = async () => {
    if (messageInput.trim() && socket) {
      socket.emit("sendMessage", {
        roomId: curRoomId,
        clientId: userId,
        sender: "client",
        message: messageInput,
      });
      setMessageInput("");
    }
  };
  function onClick() {
    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
    }));
  }
  useEffect(() => {
    if (userId) {
      const socketconnect = openSocket("http://localhost:5000");
      socketconnect.on("receiveMessage", (data) => {
        setListMessage(data.message);
      });
      if (!curRoomId) {
        curRoomId = uuid4();
        localStorage.setItem(
          "listRoom",
          JSON.stringify([
            ...listRoomId,
            { roomId: curRoomId, clientId: userId },
          ])
        );
      }
      getListMessage();
      socketconnect.emit("setRoom", { roomId: curRoomId, clientId: userId });
      setSocket(socketconnect);
    }
  }, [userId]);
  //JSX trả ra các thành phần trong liveChat theo đề bài, có 1 số dynamic Class để quản lý xem người gửi là them hay me, kích thước của popUp
  return (
    <div
      className={`${styles.popupChatContainer} ${
        state.isOpen ? styles.expandContainer : ""
      } `}
    >
      <Shake isShow={state.isOpen}>
        <>
          {state.isOpen && (
            <div className={styles.popupChat}>
              <div className={styles.chatTitleBar}>
                <h4>Customer support</h4>
                <button>Let's Chat App</button>
              </div>
              <ul className={styles.chatContent}>
                {listMessage.map((message) => {
                  return (
                    <li key={message._id} className={styles[message.sender]}>
                      {`${
                        message.sender === "client" ? "You:" : "Tư vấn viên:"
                      } ${message.text}`}
                    </li>
                  );
                })}
              </ul>
              <div className={styles.inputChatContainer}>
                <FcManager />
                <div className={styles.inputChat}>
                  <input
                    placeholder="Enter Message!"
                    value={messageInput}
                    onChange={messageChangeHandler}
                  ></input>
                  <i
                    onClick={sendMessageHandler}
                    className={`fa-solid fa-paper-plane ${styles.iconSend}`}
                  ></i>
                </div>
              </div>
            </div>
          )}
        </>
      </Shake>
      <i
        className={`fa-brands fa-facebook-messenger ${styles.openPopchat}`}
        onClick={onClick}
      ></i>
    </div>
  );
}
export default PopupLiveChat;
