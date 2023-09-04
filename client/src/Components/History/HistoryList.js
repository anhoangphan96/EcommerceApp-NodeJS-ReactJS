import { useEffect, useState } from "react";
import styles from "./HistoryList.module.css";
import HistoryItem from "./HistoryItem";
import { useNavigate } from "react-router-dom";
const HistoryList = () => {
  const navigate = useNavigate();
  const [hisList, setHisList] = useState([]);
  const getHistList = async () => {
    const response = await fetch(`http://localhost:5000/order/hislist`, {
      mode: "cors",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setHisList(data);
    } else {
      if (response.status === 401) {
        navigate("/login?mode=login");
      } else if (response.status === 500) {
        navigate("/servererror");
      }
    }
  };
  useEffect(() => {
    getHistList();
  }, []);
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr className={styles.hisListTitle}>
            <th className={styles.hisId}>ID ORDER</th>
            <th className={styles.userId}>ID USER</th>
            <th className={styles.userName}>NAME</th>
            <th className={styles.phone}>PHONE</th>
            <th className={styles.address}>ADDRESS</th>
            <th className={styles.total}>TOTAL</th>
            <th className={styles.delivery}>DELIVERY</th>
            <th className={styles.status}>STATUS</th>
            <th className={styles.detail}>DETAIL</th>
          </tr>
        </thead>
        <tbody>
          {hisList.map((hisItem) => {
            return (
              <HistoryItem hisItem={hisItem} key={hisItem._id}></HistoryItem>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default HistoryList;
