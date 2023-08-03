import styles from "./Item.module.css";
import ZoomOut from "./Transitions/ZoomOut";
import { useFormatPrice } from "./customHooks/useFormatPrice";
const Item = (props) => {
  // format lại price bằng custom hook
  const price = useFormatPrice(props.product.price);
  // Item component sẽ render ra hình ảnh sản phẩm, tên sản phẩm và giá tiền, được sử dụng hiệu ứng ZoomOut từ component animation Zoomout
  return (
    <ZoomOut>
      <div className={styles.itemContainer} id={props.product._id.$oid}>
        <img src={props.product.img1}></img>
        <h3>{props.product.name}</h3>
        <h4>{price} VND</h4>
      </div>
    </ZoomOut>
  );
};
export default Item;
