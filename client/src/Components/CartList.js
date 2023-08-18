import { useNavigate } from "react-router-dom";
import styles from "./Cartlist.module.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { cartActions } from "../redux/store";
const Cartlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listCart, setListCart] = useState([]);
  //Biến chứa email của current User nếu không đăng nhập thì là ""
  const emailCurUser = useSelector((state) => {
    if (state.login.isLogin) {
      return state.login.curUser.email;
    } else {
      return "";
    }
  });

  const getListCart = async () => {
    const response = await fetch(`http://localhost:5000/user/listcart`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    dispatch(cartActions.UPDATECART(data));
    setListCart(data);
  };
  useEffect(() => {
    getListCart();
  }, []);
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
            return (
              <CartItem
                productCart={productCart}
                key={productCart._id}
                getListCart={getListCart}
              />
            );
          })}
        </tbody>
      </table>
      <div className={styles.navigate}>
        <button onClick={contShoppingHandler} className={styles.btnbackToShop}>
          <i className="fa-sharp fa-solid fa-left-long"></i> Continue shopping
        </button>
        <button onClick={checkoutHandler}>
          Proceed to checkout
          <i className="fa-sharp fa-solid fa-right-long"></i>
        </button>
      </div>
    </div>
  );
};
export default React.memo(Cartlist);
