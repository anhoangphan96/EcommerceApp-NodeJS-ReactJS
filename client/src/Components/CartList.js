import { useNavigate } from "react-router-dom";
import styles from "./Cartlist.module.css";
import { useSelector } from "react-redux";
import React from "react";
import CartItem from "./CartItem";
const Cartlist = () => {
  const navigate = useNavigate();
  //Biến chứa email của current User nếu không đăng nhập thì là ""
  const emailCurUser = useSelector((state) => {
    if (state.login.isLogin) {
      return state.login.curUser[0].email;
    } else {
      return "";
    }
  });
  //Biến chứa listCart được fillter theo user
  const listCart = useSelector((state) => state.cart.listCart).filter(
    (cart) => cart.email === emailCurUser
  );
  // Hai hàm quản lý navigate user tới các trang khác nhau khi click vào button
  const contShoppingHandler = () => {
    navigate("/shop");
  };
  const checkoutHandler = () => {
    navigate("/checkout");
  };

  // JSX trả ra table chứa các sản phẩm theo email user chứa các thông tin sản phẩm
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr className={styles.cartTitle}>
            <th>IMAGE</th>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
            <th>REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {listCart.map((productCart) => {
            return <CartItem productCart={productCart} key={productCart.id} />;
          })}
        </tbody>
      </table>
      <div className={styles.navigate}>
        <button onClick={contShoppingHandler} className={styles.btnbackToShop}>
          <i className="fa-sharp fa-solid fa-left-long"></i> Continue shopping
        </button>
        <button onClick={checkoutHandler}>
          Proceed to checkout{" "}
          <i className="fa-sharp fa-solid fa-right-long"></i>
        </button>
      </div>
    </div>
  );
};
export default React.memo(Cartlist);
