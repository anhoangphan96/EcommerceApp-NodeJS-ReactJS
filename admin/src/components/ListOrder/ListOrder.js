import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ListOrderItem from "./ListOrderItem";
import styles from "./ListOrder.module.css";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/reduxstore";
const ListOrder = () => {
  const [listOrders, setListOrders] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = useOutletContext();
  const path = useLocation().pathname;
  let urlToFetch = `${process.env.REACT_APP_BACKEND_URL}/order/${
    path === "/" ? "lastest8" : "getall"
  }`;
  const getListOrder = async () => {
    const response = await fetch(urlToFetch, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setListOrders(data);
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
  useEffect(() => {
    getListOrder();
  }, []);
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
