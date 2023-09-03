import PopupModal from "../Modal/PopupModal";
import styles from "./UserItem.module.css";
import { useState } from "react";
const UserItem = (props) => {
  console.log(props);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const postSetAdmin = async (role) => {
    const response = await fetch(`http://localhost:5000/user/setrole`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: props.user._id, setToRole: role }),
    });
    const messageRes = await response.json();
    setMessage(messageRes.message);
  };
  const setRoleHandler = (event) => {
    setShowPopup(true);
    //Lấy phần text có role trong 2 button để truyền role vào function
    const role = event.target.innerHTML.toLowerCase().split(" ")[1];
    postSetAdmin(role);
  };
  const closeHandler = () => {
    props.getListUser();
    setMessage("");
    setShowPopup(false);
  };
  return (
    <>
      <tr>
        <td className={styles.idColumn}>{props.user._id}</td>
        <td className={styles.emailColumn}>{props.user.email}</td>
        <td className={styles.fullNameColumn}>{props.user.fullName}</td>
        <td className={styles.phoneColumn}>{props.user.phoneNumber}</td>
        <td className={styles.typeColumn}>{props.user.role}</td>
        {/* Khi đã là admin rồi thì sẽ không thấy button set role nào nửa, client thì được set thành admin hoặc counselor, 
        counselor thì được set thành admin */}
        <td>
          {props.user.role !== "admin" && (
            <button className={styles.setAdminBtn} onClick={setRoleHandler}>
              Set Admin
            </button>
          )}
          {props.user.role === "client" && (
            <button className={styles.counselorBtn} onClick={setRoleHandler}>
              Set Counselor
            </button>
          )}
        </td>
      </tr>
      {showPopup && (
        <PopupModal message={message}>
          <div className={styles.popupbuttons}>
            <button className={styles.closeBtn} onClick={closeHandler}>
              Close
            </button>
          </div>
        </PopupModal>
      )}
    </>
  );
};
export default UserItem;
