import formatPrice from "../../helper/formatPrice";
import styles from "./ProrductItem.module.css";
const ProductItem = (props) => {
  return (
    <tr>
      <td>{props.product._id} </td>
      <td>{props.product.name} </td>
      <td>{formatPrice(props.product.price)} </td>
      <td>
        <img src={props.product.img1} width={60} />
      </td>
      <td>{props.product.category}</td>
      <td>
        <button className={styles.updateBtn}>Update</button>
        <button className={styles.deleteBtn}>Delete</button>
      </td>
    </tr>
  );
};
export default ProductItem;
