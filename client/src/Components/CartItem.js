import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./CartItem.module.css";
import { cartActions } from "../redux/store";
import { useDispatch } from "react-redux";
import { useFormatPrice } from "./customHooks/useFormatPrice";

const CartItem = (props) => {
  //Khai báo các biến thông tin
  const [quantity, setQuantity] = useState(props.productCart.quantity);
  //dùng custom hook để định dạng phần price cho price đơn và price tổng
  const productPrice = useFormatPrice(props.productCart.productId.price);
  const productQuantityxPrice = useFormatPrice(
    props.productCart.productId.price * quantity
  );

  //Xây dựng function để fetch api  update cart ở database
  const postUpdateCart = async (action) => {
    const idUpdateCart = props.productCart.productId._id;
    const response = await fetch(`http://localhost:5000/user/updatecart`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: action, productId: idUpdateCart }),
    });
    if (response.ok) {
      props.getListCart();
      const data = await response.json();
      setQuantity(data.quantity);
    }
  };
  //Xây dưng function tăng số lượng ý tưởng cũng giống remove nhưng với action giảm số lượng, không cho bé hơn 1
  const decreaseQuant = () => {
    postUpdateCart("decrease");
  };
  //Xây dưng function tăng số lượng ý tưởng cũng giống remove nhưng với action tăng số lượng
  const increaseQuant = () => {
    postUpdateCart("increase");
  };
  //Xây dựng function để xóa sản phẩm, lọc listCart chỉ giữ lại những product có id khác với id sản phẩm bị click vào nút remove hoặc khác email đang đăng nhập
  const removeProductHandler = async () => {
    const idCartDelete = props.productCart.productId._id;
    const response = await fetch(`http://localhost:5000/user/deletecart`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: idCartDelete }),
    });
    if (response.ok) {
      props.getListCart();
    }
  };
  //JSX trả ra ra từng dòng trong table chứa các thông tin tương ứng về các sản phẩm được từng user thêm vào
  return (
    <tr
      key={props.productCart.id}
      id={props.productCart.id}
      className="cartRow"
    >
      <td className={styles.imageProduct}>
        <img src={props.productCart.productId.img1}></img>
      </td>
      <td className={styles.nameProduct}>{props.productCart.productId.name}</td>
      <td className={styles.priceProduct}>
        {productPrice} <br /> VND
      </td>
      <td className={styles.quantityProduct}>
        <i className="fa-solid fa-caret-left" onClick={decreaseQuant}></i>
        {quantity}
        <i className="fa-solid fa-caret-right" onClick={increaseQuant}></i>
      </td>
      <td className={styles.priceProduct}>
        {productQuantityxPrice} <br />
        VND
      </td>
      <td className={styles.removeProduct}>
        <i
          className="fa-regular fa-trash-can"
          onClick={removeProductHandler}
        ></i>
      </td>
    </tr>
  );
};
export default React.memo(CartItem);
