import React from "react";
import { useFormatPrice } from "./customHooks/useFormatPrice";
import styles from "./OrderPriceItem.module.css";
const OrderPriceItem = (props) => {
  //Sử dụng custom hook để format lại price
  const price = useFormatPrice(props.product.price);
  //trả về JSX hiển thị data tên, giá và số lượng của từng sản phẩm cuối cùng được thanh toán
  return (
    <li className={styles.productPrice}>
      <span className={styles.productName}>{props.product.name}</span>
      <span className={styles.productTotalPrice}>
        {price} VND x {props.product.quantity}
      </span>
    </li>
  );
};
export default OrderPriceItem;
