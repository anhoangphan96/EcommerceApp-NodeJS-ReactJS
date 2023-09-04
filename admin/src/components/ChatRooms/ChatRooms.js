import BoxChat from "./BoxChat";
import styles from "./ChatRooms.module.css";
import { useEffect, useState } from "react";
import { FcManager } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { loginActions } from "../../store/reduxstore";
import openSocket from "socket.io-client";
const ChatRooms = () => {
  const [listRoom, setListRoom] = useState([]);
  const [socket, setSocket] = useState(null);
  const [listMessage, setListMessage] = useState([]);
  const [selectRoom, setSelectRoom] = useState("");
  const [clientId, setClientId] = useState("");
  const [roomEndTemp, setRoomEndTemp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = useOutletContext();
  const getListRooms = async () => {
    const response = await fetch(`http://localhost:5000/chat/getlistroom`, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setListRoom(data);
    } else {
      if (response.status === 401) {
        dispatch(loginActions.ON_LOGOUT());
        logoutHandler();
        navigate("/login");
      } else if (response.status === 500) {
        navigate("/servererror");
      }
    }
  };
  const selectRoomHandler = (event) => {
    const roomId = event.currentTarget.id;
    const clientIdTemp = listRoom.find((room) => room.roomId === roomId)
      .clientId._id;
    setSelectRoom(roomId);
    setClientId(clientIdTemp);
    getListMessage(clientIdTemp);
  };
  const checkListRoom = (roomId) => {
    console.log("asd", roomId);
    if (listRoom.findIndex((room) => room.roomId === roomId) === -1) {
      getListRooms();
    } else return;
  };
  const getListMessage = async (clientId) => {
    const response = await fetch(
      `http://localhost:5000/chat/getmessages/${clientId}`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.clientId === clientId) {
        setListMessage(data.message);
      }
    } else {
      //K cần validate lỗi 401 vì để fetch message thì phải fetch listroom trước, api đó đã validate lỗi 401 unauthorized rồi
      if (response.status === 500) {
        navigate("/servererror");
      }
    }
  };

  const updateListMessage = (data) => {
    console.log(clientId);
    if (data.clientId === clientId) {
      setListMessage(data.message);
    }
  };
  useEffect(() => {
    if (roomEndTemp === selectRoom) {
      setSelectRoom("");
      setClientId("");
      setListMessage([]);
    }
  }, [roomEndTemp]);
  useEffect(() => {
    getListRooms();
    const socketconnect = openSocket("http://localhost:5000");
    setSocket(socketconnect);
    socketconnect.on("haveNewRoom", (data) => {
      checkListRoom(data);
      socketconnect.emit("setRoom", { roomId: data });
    });
    socketconnect.on("endRoom", (result) => {
      setRoomEndTemp(result.roomId);
      getListRooms();
    });
    //Dùng để check xem khi có 1 người dùng mới tạo room mới thì sẽ cập nhật lai listRoom
  }, []);
  console.log(clientId);
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
          socket={socket}
          clientId={clientId}
          roomId={selectRoom}
          updateListMessage={updateListMessage}
          listMessage={listMessage}
        />
      </div>
    </div>
  );
};
export default ChatRooms;
