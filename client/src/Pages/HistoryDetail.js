import { useSelector } from "react-redux";
import styles from "./HistoryDetail.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormatPrice } from "../Components/customHooks/useFormatPrice";
import OrderItem from "../Components/History/OderItem";
const HistoryDetail = () => {
  const orderId = useParams().id;
  const [orderInfor, setOrderInfor] = useState({
    totalPrice: 0,
    items: [],
  });
  const userId = useSelector((state) => state.login.curUser.id);

  const price = useFormatPrice(orderInfor.totalPrice);
  const getOrderDetail = async () => {
    const response = await fetch(
      `http://localhost:5000/order/detail/${orderId}`
    );
    const data = await response.json();
    setOrderInfor(data);
  };
  useEffect(() => {
    getOrderDetail();
  }, []);
  const userData = useSelector((state) => state.login.curUser);

  return (
    <>
      <div className={styles.title}>
        <h2>INFORMATION ORDER</h2>
        <p>ID User: {userId}</p>
        <p>Full Name: {orderInfor.fullName}</p>
        <p>Phone: {orderInfor.phone}</p>
        <p>Address: {orderInfor.address}</p>
        <p>Total: {price} VND</p>
      </div>
      <div className={styles.listItemContainer}>
        <table>
          <thead>
            <tr className={styles.listItemTitle}>
              <th>ID Product</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>COUNT</th>
            </tr>
          </thead>
          <tbody>
            {orderInfor.items.map((item) => {
              return <OrderItem item={item} key={item._id} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default HistoryDetail;
