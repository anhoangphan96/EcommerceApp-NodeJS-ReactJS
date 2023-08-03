import React, { useState } from "react";
import styles from "./PopupLiveChat.module.css";
import { FcManager } from "react-icons/fc";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Shake from "./Transitions/Shake";
function PopupLiveChat() {
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
  //Function quản lý hành động click để mở hay đóng popup chat
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
                  <input placeholder="Enter Message!"></input>
                  <i className="fa-solid fa-file"></i>
                  <i className="fa-solid fa-face-smile"></i>
                  <i
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
