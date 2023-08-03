import React from "react";
import { useState } from "react";
import styles from "./CartItem.module.css";
import { cartActions } from "../redux/store";
import { useDispatch } from "react-redux";
import { useFormatPrice } from "./customHooks/useFormatPrice";
import { useSelector } from "react-redux";
const CartItem = (props) => {
  const dispatch = useDispatch();
  //Khai báo listCart để hổ trợ các hành động trong phần cart Item
  const listCart = useSelector((state) => state.cart.listCart);
  //Khai báo Email của current user nếu không có ai đăng nhập thì trả ""
  const emailCurUser = useSelector((state) => {
    if (state.login.isLogin) {
      return state.login.curUser[0].email;
    } else {
      return "";
    }
  });
  //Khai báo các biến thông tin
  const [quantity, setQuantity] = useState(props.productCart.quantity);
  //dùng custom hook để định dạng phần price cho price đơn và price tổng
  const productPrice = useFormatPrice(props.productCart.price);
  const productQuantityxPrice = useFormatPrice(
    props.productCart.price * quantity
  );
  //Xây dựng function để xóa sản phẩm, lọc listCart chỉ giữ lại những product có id khác với id sản phẩm bị click vào nút remove hoặc khác email đang đăng nhập
  const removeProductHandler = (event) => {
    const idRemove = event.target.closest(".cartRow").id;
    dispatch(cartActions.DELETE_CART({ id: idRemove, email: emailCurUser }));
    //Update total price
    dispatch(cartActions.UPDATE_TOTALPRICE(emailCurUser));
    //Update local storage
    localStorage.setItem(
      "listCart",
      JSON.stringify(
        listCart.filter(
          (cart) => cart.id !== idRemove || cart.email !== emailCurUser
        )
      )
    );
  };
  //Xây dưng function tăng số lượng ý tưởng cũng giống remove nhưng với action giảm số lượng, không cho bé hơn 1
  const decreaseQuant = (event) => {
    const idUpdateCart = event.target.closest(".cartRow").id;
    setQuantity((prev) => {
      if (prev === 1 || prev === "") {
        return 1;
      }
      dispatch(
        cartActions.UPDATE_CART({ quantity: prev - 1, id: idUpdateCart })
      );
      const newListCart = [...listCart];
      const index = listCart.findIndex(
        (cart) => cart.id === idUpdateCart && cart.email === emailCurUser
      );
      newListCart[index] = { ...newListCart[index], quantity: prev - 1 };
      localStorage.setItem("listCart", JSON.stringify(newListCart));
      dispatch(cartActions.UPDATE_TOTALPRICE(emailCurUser));
      return prev - 1;
    });
  };
  //Xây dưng function tăng số lượng ý tưởng cũng giống remove nhưng với action tăng số lượng
  const increaseQuant = (event) => {
    const idUpdateCart = event.target.closest(".cartRow").id;
    setQuantity((prev) => {
      if (prev === "") {
        return 1;
      }
      dispatch(
        cartActions.UPDATE_CART({ quantity: prev + 1, id: idUpdateCart })
      );
      const newListCart = [...listCart];
      const index = listCart.findIndex(
        (cart) => cart.id === idUpdateCart && cart.email === emailCurUser
      );
      newListCart[index] = { ...newListCart[index], quantity: prev + 1 };
      localStorage.setItem("listCart", JSON.stringify(newListCart));
      dispatch(cartActions.UPDATE_TOTALPRICE(emailCurUser));
      return prev + 1;
    });
  };
  //JSX trả ra ra từng dòng trong table chứa các thông tin tương ứng về các sản phẩm được từng user thêm vào
  return (
    <tr
      key={props.productCart.id}
      id={props.productCart.id}
      className="cartRow"
    >
      <td className={styles.imageProduct}>
        <img src={props.productCart.image}></img>
      </td>
      <td className={styles.nameProduct}>{props.productCart.name}</td>
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
