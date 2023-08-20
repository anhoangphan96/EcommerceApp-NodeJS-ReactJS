import React, { useState } from "react";
import styles from "./PopupLiveChat.module.css";
import { FcManager } from "react-icons/fc";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Shake from "./Transitions/Shake";
import { useSelector } from "react-redux";
function PopupLiveChat(props) {
  const [messageInput, setMessageInput] = useState("");
  const curUser = useSelector((state) => state.login.curUser);

  // state quản lý nội dung chat hiển thị mặc định
  const [state, setState] = useState({
    messageList: [
      {
        author: "me",
        data: "Xin Chào",
      },

      {
        author: "me",
        data: "Làm thế nào để xem các sản phẩm",
      },

      {
        author: "them",
        data: "ADMIN: Chào bạn",
      },
      {
        author: "them",
        data: "ADMIN: Bạn có thể vào mục shop để xem các sản phẩm",
      },
    ],

    isOpen: false,
  });
  const messageChangeHandler = (event) => {
    setMessageInput(event.target.value);
  };
  //Function quản lý hành động click để mở hay đóng popup chat
  const sendMessageHandler = async () => {
    if (messageInput.trim()) {
      const response = await fetch(`http://localhost:5000/chat/send`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: curUser.id,
          message: messageInput,
        }),
      });
    }
  };
  function onClick() {
    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
    }));
  }
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
                {state.messageList.map((message, i) => {
                  let Objectchat =
                    message.author === "them" ? (
                      <div className={styles.themChatSection} key={i}>
                        <FcManager />
                        <span className={styles[message.author]}>
                          {message.data}
                        </span>
                      </div>
                    ) : (
                      <span key={i} className={styles[message.author]}>
                        {message.data}
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
