import { useSelector } from "react-redux";
import styles from "./HistoryDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormatPrice } from "../Components/customHooks/useFormatPrice";
import OrderItem from "../Components/History/OderItem";
const HistoryDetail = () => {
  const orderId = useParams().id;
  const navigate = useNavigate();
  const [orderInfor, setOrderInfor] = useState({
    totalPrice: 0,
    items: [],
  });
  const userId = useSelector((state) => state.login.curUser.id);

  const price = useFormatPrice(orderInfor.totalPrice);
  const getOrderDetail = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/order/detail/${orderId}`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      setOrderInfor(data);
    } else {
      if (response.status === 401) {
        navigate("/login?mode=login");
      } else if (response.status === 500) {
        navigate("/servererror");
      }
    }
  };
  useEffect(() => {
    getOrderDetail();
  }, []);

  return (
    <>
      <div className={styles.title}>
        <h2>INFORMATION ORDER</h2>
        <p>ID User: {orderInfor.userId}</p>
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
