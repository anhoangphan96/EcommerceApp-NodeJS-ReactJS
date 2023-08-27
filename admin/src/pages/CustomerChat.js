import styles from "./CustomerChat.module.css";
import Card from "../components/CardContainer/Card";
import ChatRooms from "../components/ChatRooms/ChatRooms";
const CustomerChat = () => {
  return (
    <div className={styles.chatContainer}>
      <h2>Chat</h2>
      <p>Apps / Chat</p>
      <Card>
        <ChatRooms />
      </Card>
    </div>
  );
};
export default CustomerChat;
