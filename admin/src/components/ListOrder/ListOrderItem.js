import styles from "./ListOrderItem.module.css";
import formatPrice from "../../helper/formatPrice";
const ListOrderItem = (props) => {
  return (
    <tr>
      <td>{props.order.userId} </td>
      <td>{props.order.fullName} </td>
      <td>{props.order.phone} </td>
      <td>{props.order.address}</td>
      <td>{formatPrice(props.order.totalPrice)} VND</td>
      <td>Chưa Vận Chuyển</td>
      <td>Chưa Thanh Toán</td>
      <td>
        <button className={styles.viewBtn}>View</button>
      </td>
    </tr>
  );
};
export default ListOrderItem;
