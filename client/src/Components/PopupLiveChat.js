import React, { useState, useEffect } from "react";
import styles from "./PopupLiveChat.module.css";
import { FcManager } from "react-icons/fc";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Shake from "./Transitions/Shake";
import { useSelector } from "react-redux";
import openSocket from "socket.io-client";

function PopupLiveChat(props) {
  const [messageInput, setMessageInput] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const [socket, setSocket] = useState(null);
  const curUser = useSelector((state) => state.login.curUser);
  const id = curUser ? curUser._id : "";
  let [roomId, setRoomId] = useState(
    JSON.parse(localStorage.getItem("roomId")) ?? []
  );
  console.log(roomId[0].roomId);
  // state quản lý nội dung chat hiển thị mặc định
  const [state, setState] = useState({
    isOpen: false,
  });

  const getListMessage = async () => {
    const response = await fetch(
      `http://localhost:5000/chat/getmessages/${roomId[0].roomId}`
    );
    const data = await response.json();
    console.log(data);
    setListMessage(data);
  };
  const messageChangeHandler = (event) => {
    setMessageInput(event.target.value);
  };
  //Function quản lý hành động click để mở hay đóng popup chat
  const sendMessageHandler = async () => {
    if (messageInput.trim() && socket) {
      socket.emit("sendMessage", {
        roomId: id,
        senderId: id,
        sender: "client",
        message: messageInput,
      });
    }
  };
  function onClick() {
    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
    }));
  }
  useEffect(() => {
    console.log(id);
    //Sử dụng id của user để làm roomId để biết room đó đang nói chuyện với user nào và dễ cho search contact
    if (id) {
      const socketconnect = openSocket("http://localhost:5000");
      socketconnect.on("receiveMessage", (data) => {
        console.log(data);
      });
      if (!roomId.length) {
        localStorage.setItem("roomId", JSON.stringify([{ roomId: id }]));
        setRoomId(id);
        socketconnect.emit("setRoom", id);
      }
      setSocket(socketconnect);
    }
  }, [id]);
  useEffect(() => {
    getListMessage();
  }, []);
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
              <div className={styles.chatContent}>
                {listMessage.map((message, i) => {
                  let Objectchat =
                    message.sender === "counselor" ? (
                      <div className={styles.themChatSection} key={i}>
                        <FcManager />
                        <span className={styles[message.author]}>
                          {message.text}
                        </span>
                      </div>
                    ) : (
                      <span key={i} className={styles[message.author]}>
                        {message.text}
                      </span>
                    );
                  return Objectchat;
                })}
              </div>
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
