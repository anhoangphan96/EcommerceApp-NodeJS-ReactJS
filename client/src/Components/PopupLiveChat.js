import React, { useState, useEffect } from "react";
import styles from "./PopupLiveChat.module.css";
import { FcManager } from "react-icons/fc";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Shake from "./Transitions/Shake";
import { useSelector } from "react-redux";
import openSocket from "socket.io-client";
import uuid4 from "uuid4";
import { useNavigate } from "react-router-dom";
function PopupLiveChat() {
  const [messageInput, setMessageInput] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnectRoom, setIsConnectRoom] = useState(false);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.login.curUser)?._id;
  const listRoomId = JSON.parse(localStorage.getItem("listRoom")) ?? [];
  const [curRoomId, setCurRoomId] = useState("");
  // state quản lý nội dung chat hiển thị mặc định
  const [state, setState] = useState({
    isOpen: false,
  });
  const getListMessage = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/chat/getmessages/${userId}`,
      {
        credentials: "include",
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      setListMessage(data.message);
      if (listRoomId.findIndex((room) => room.roomId === data.roomId) === -1) {
        setCurRoomId(data.roomId);
        localStorage.setItem(
          "listRoom",
          JSON.stringify([
            ...listRoomId,
            { roomId: data.roomId, clientId: userId },
          ])
        );
      }
    } else {
      if (response.status === 401) {
        navigate("/login?mode=login");
      } else if (response.status === 500) {
        navigate("/servererror");
      }
    }
  };
  const messageChangeHandler = (event) => {
    setMessageInput(event.target.value);
  };
  //Function quản lý hành động click để mở hay đóng popup chat
  const sendMessageHandler = async () => {
    //User phải đăng nhập mới được gửi tin nhắn
    if (!userId) {
      navigate("/login?mode=login");
      setState({
        isOpen: false,
      });
    } else {
      if (messageInput.trim() && socket) {
        socket.emit("sendMessage", {
          roomId: curRoomId,
          clientId: userId,
          sender: "client",
          message: messageInput,
        });
        setMessageInput("");
      }
    }
  };
  function onClick() {
    setState((state) => ({
      isOpen: !state.isOpen,
    }));
    setIsConnectRoom(true);
  }
  useEffect(() => {
    if (userId) {
      setCurRoomId(listRoomId.find((room) => room.clientId === userId)?.roomId);
      state.isOpen && getListMessage();
      if (isConnectRoom) {
        const socketconnect = openSocket(
          `${process.env.REACT_APP_BACKEND_URL}`
        );
        if (!curRoomId) {
          const newCurRoomId = uuid4();
          setCurRoomId(newCurRoomId);
          localStorage.setItem(
            "listRoom",
            JSON.stringify([
              ...listRoomId,
              { roomId: newCurRoomId, clientId: userId },
            ])
          );
        } else {
          socketconnect.emit("setRoom", {
            roomId: curRoomId,
            clientId: userId,
          });
          socketconnect.on("receiveMessage", (data) => {
            setListMessage(data.message);
          });
          socketconnect.on("endRoom", (data) => {
            setListMessage([]);
            const updateListRoom = listRoomId.filter(
              (room) => room.roomId !== curRoomId
            );
            localStorage.setItem("listRoom", JSON.stringify(updateListRoom));
            setState({
              isOpen: false,
            });
            setIsConnectRoom(false);
          });
          setSocket(socketconnect);
        }
      }
    }
  }, [userId, isConnectRoom, curRoomId]);
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
                    <li
                      key={message._id}
                      className={`${styles.message} ${styles[message.sender]}`}
                    >
                      {message.sender === "counselor" && <FcManager />}
                      <div>
                        {`${
                          message.sender === "client" ? "You:" : "Tư vấn viên:"
                        } ${message.text}`}
                      </div>
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
