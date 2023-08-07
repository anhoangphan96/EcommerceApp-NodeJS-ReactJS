import { useEffect, useState } from "react";
import styles from "./HistoryList.module.css";
import HistoryItem from "./HistoryItem";
const HistoryList = () => {
  const [hisList, setHisList] = useState([]);
  const getHistList = async () => {
    const response = await fetch(`http://localhost:5000/order/hislist`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setHisList(data);
    }
  };
  console.log(hisList);
  useEffect(() => {
    getHistList();
  }, []);
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr className={styles.hisListTitle}>
            <th>ID ORDER</th>
            <th>ID USER</th>
            <th>NAME</th>
            <th>PHONE</th>
            <th>ADDRESS</th>
            <th>TOTAL</th>
            <th>DELIVERY</th>
            <th>STATUS</th>
            <th>DETAIL</th>
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
