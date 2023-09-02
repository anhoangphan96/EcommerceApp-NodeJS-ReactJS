import { useEffect, useState } from "react";
import Card from "../CardContainer/Card";
import styles from "./InforBoard.module.css";
import formatPrice from "../../helper/formatPrice";
const InforBoard = () => {
  const [numofClient, setNumOfClient] = useState(0);
  const [numofOrder, setNumOfOrder] = useState(0);
  const [revPerMonth, setRevPerMonth] = useState(0);
  //Lấy số client có trong hệ thống
  const getNumOfClient = async () => {
    const response = await fetch(`http://localhost:5000/user/numofclient`, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setNumOfClient(data.amount);
    }
  };
  //Lấy số order và doanh thu tháng hiện tại không lấy tổng doanh thu năm
  const getOrderRev = async () => {
    const response = await fetch(`http://localhost:5000/order/revorder`, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setNumOfOrder(data.numOfOrder);
      setRevPerMonth(data.totalRevPerMonth);
    }
  };
  useEffect(() => {
    getOrderRev();
    getNumOfClient();
  }, []);
  return (
    <Card className={styles.infoBoard}>
      <div className={`${styles.infor} ${styles.clients}`}>
        <div className={styles.inforDetail}>
          <h3>{numofClient}</h3>
          <span>Clients</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-user-plus"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
          <path d="M16 19h6"></path>
          <path d="M19 16v6"></path>
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4"></path>
        </svg>
      </div>
      <div className={`${styles.infor} ${styles.earning}`}>
        <div className={styles.inforDetail}>
          <h3 className={styles.money}>
            {formatPrice(revPerMonth)} <span>VND</span>
          </h3>
          <span> Earnings of Month</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-currency-dollar"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"></path>
          <path d="M12 3v3m0 12v3"></path>
        </svg>
      </div>
      <div className={styles.infor}>
        <div className={styles.inforDetail}>
          <h3>{numofOrder}</h3>
          <span>New Order</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-text-plus"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M19 10h-14"></path>
          <path d="M5 6h14"></path>
          <path d="M14 14h-9"></path>
          <path d="M5 18h6"></path>
          <path d="M18 15v6"></path>
          <path d="M15 18h6"></path>
        </svg>
      </div>
    </Card>
  );
};
export default InforBoard;
