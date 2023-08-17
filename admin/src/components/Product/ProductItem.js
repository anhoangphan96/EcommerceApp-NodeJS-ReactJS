import { useNavigate } from "react-router-dom";
import formatPrice from "../../helper/formatPrice";
import styles from "./ProrductItem.module.css";
const ProductItem = (props) => {
  const navigate = useNavigate();
  const updateHandler = () => {
    navigate(`/products/form?mode=update&id=${props.product._id}`);
  };
  const deleteHandler = async () => {
    const response = await fetch(
      `http://localhost:5000/product/delete?id=${props.product._id}`,
      {
        method: "delete",
      }
    );
    if (response.ok) {
      props.getListProducts();
    }
  };

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
        <button className={styles.updateBtn} onClick={updateHandler}>
          Update
        </button>
        <button className={styles.deleteBtn} onClick={deleteHandler}>
          Delete
        </button>
      </td>
    </tr>
  );
};
export default ProductItem;
