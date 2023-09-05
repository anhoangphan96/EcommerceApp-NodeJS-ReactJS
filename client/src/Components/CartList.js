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
  const [message, setMessage] = useState("");

  const getListCart = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/listcart`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(cartActions.UPDATECART(data.cart));
      setListCart(data.cart);
      setMessage(data.message);
      //Nếu chưa đăng nhập không thể dùng chức năng cart phải đăng nhập trước
    } else {
      if (response.status === 401) {
        navigate("/login?mode=login");
      } else if (response.status === 500) {
        navigate("/servererror");
      }
    }
  };
  useEffect(() => {
    getListCart();
  }, []);
  // Hai hàm quản lý navigate user tới các trang khác nhau khi click vào button
  const contShoppingHandler = () => {
    navigate("/shop");
  };
  const checkoutHandler = () => {
    if (listCart.length > 0) {
      setMessage("");
      navigate("/checkout");
    } else {
      setMessage("Can't checkout without any cart item");
    }
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
      {message && <p>{message}</p>}
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
