import BoxChat from "./BoxChat";
import styles from "./ChatRooms.module.css";
import { useEffect, useState } from "react";
const ChatRooms = () => {
  const [listRoom, setListRoom] = useState([]);
  const [selectRoom, setSelectRoom] = useState("");
  console.log(selectRoom);
  const getListRooms = async () => {
    const response = await fetch(`http://localhost:5000/chat/getlistroom`);
    const data = await response.json();
    setListRoom(data);
    console.log(data);
  };
  const selectRoomHandler = (event) => {
    setSelectRoom(event.target.id);
  };
  useEffect(() => {
    getListRooms();
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
              key={room.roomId._id}
              id={room.roomId._id}
              onClick={selectRoomHandler}
              className={`${styles.roomChatId} ${
                selectRoom === room.roomId._id ? styles.selectedRoom : ""
              }`}
            >
              {room.roomId._id + " - " + room.roomId.email}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.chatContent}>
        <BoxChat roomId={selectRoom} />
      </div>
    </div>
  );
};
export default ChatRooms;
