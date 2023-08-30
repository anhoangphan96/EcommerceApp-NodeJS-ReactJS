import BoxChat from "./BoxChat";
import styles from "./ChatRooms.module.css";
import { useEffect, useState } from "react";
import { FcManager } from "react-icons/fc";
const ChatRooms = () => {
  const [listRoom, setListRoom] = useState([]);
  const [selectRoom, setSelectRoom] = useState("");
  const [clientId, setClientId] = useState("");
  const getListRooms = async () => {
    const response = await fetch(`http://localhost:5000/chat/getlistroom`);
    const data = await response.json();
    setListRoom(data);
  };
  const selectRoomHandler = (event) => {
    const roomId = event.currentTarget.id;
    setSelectRoom(roomId);
    setClientId(listRoom.find((room) => room.roomId === roomId).clientId._id);
  };
  const checkListRoom = (roomId) => {
    console.log("asd", roomId);
    if (listRoom.findIndex((room) => room.roomId === roomId) === -1) {
      getListRooms();
    } else return;
  };
  useEffect(() => {
    getListRooms();
    //Dùng để check xem khi có 1 người dùng mới tạo room mới thì sẽ cập nhật lai listRoom
  }, []);
  return (
    <div className={styles.chatRoomContainer}>
      <div className={styles.listRoom}>
        <div className={styles.searchContact}>
          <input placeholder="Search Contact"></input>
        </div>
        <ul>
          {listRoom.map((room) => (
            <li
              key={room.roomId}
              id={room.roomId}
              clientId={room.clientId._id}
              onClick={selectRoomHandler}
              className={`${styles.roomContact} ${
                selectRoom === room.roomId ? styles.selectedRoom : ""
              }`}
            >
              <FcManager />
              {room.clientId._id + " - " + room.clientId.email}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.chatContent}>
        <BoxChat
          clientId={clientId}
          roomId={selectRoom}
          checkListRoom={checkListRoom}
          getListRooms={getListRooms}
        />
      </div>
    </div>
  );
};
export default ChatRooms;
