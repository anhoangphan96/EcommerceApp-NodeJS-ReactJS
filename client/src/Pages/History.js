import HistoryList from "../Components/History/HistoryList";
import styles from "./History.module.css";

const History = () => {
  return (
    <>
      <div className={styles.title}>
        <h2>HISTORY</h2>
        <h4>HISTORY</h4>
      </div>
      <div className={styles.hisContainer}>
        <HistoryList></HistoryList>
      </div>
    </>
  );
};
export default History;
