import { useLocation } from "react-router-dom";
import Card from "../CardContainer/Card";
import { useEffect, useState } from "react";
import ListOrderItem from "./ListOrderItem";
import styles from "./ListOrder.module.css";
const ListOrder = () => {
  const [listOrders, setListOrders] = useState([]);
  const path = useLocation().pathname;
  let urlToFetch = `http://localhost:5000/order/${
    path === "/" ? "lastest8" : "getall"
  }`;
  const getListOrder = async () => {
    const response = await fetch(urlToFetch, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      setListOrders(data);
    }
  };
  useEffect(() => {
    getListOrder();
  }, []);
  console.log(listOrders);
  return (
    <div className={styles.orderContainer}>
      <h2>Products</h2>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>ID User</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {listOrders.length > 0 &&
            listOrders.map((order) => (
              <ListOrderItem key={order._id} order={order} />
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default ListOrder;
