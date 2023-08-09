import { useFormatPrice } from "../customHooks/useFormatPrice";
import styles from "./OrderItem.module.css";

const OrderItem = (props) => {
  console.log(props.item);
  const price = useFormatPrice(props.item.productId.price);
  return (
    <tr className="cartRow">
      <td className={styles.idProduct}>{props.item.productId._id}</td>
      <td className={styles.imgProduct}>
        <img src={props.item.productId.img1}></img>
      </td>
      <td className={styles.nameProduct}>{props.item.productId.name}</td>
      <td className={styles.priceProduct}>{price} VND</td>
      <td className={styles.qtyProduct}>{props.item.quantity}</td>
    </tr>
  );
};

export default OrderItem;
