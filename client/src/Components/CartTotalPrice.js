import styles from "./CartTotalPrice.module.css";
import { useSelector } from "react-redux";
import { useFormatPrice } from "./customHooks/useFormatPrice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/store";
const CartTotalPrice = (props) => {
  const dispatch = useDispatch();
  //Khai báo email user hiện tại đang đăng nhập nếu không thì trả về ""
  const emailCurUser = useSelector((state) => {
    if (state.login.isLogin) {
      return state.login.curUser[0].email;
    } else {
      return "";
    }
  });
  // khai biến chứa tổng price lấy từ redux store
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  //Sẽ update lại total price dựa trên email của người dùng
  useEffect(() => {
    dispatch(cartActions.UPDATE_TOTALPRICE(emailCurUser));
  }, [emailCurUser]);
  //dùng custom hook để custom price
  let formatPrice = useFormatPrice(totalPrice);
  //JSX trả ra thông tin các thông tin về giá sản phẩm và giá tổng sau khi trừ thuế và coupon, input coupon và nút để apply
  return (
    <div className={styles.container}>
      <h3>CART TOTAL</h3>
      <h4 className={styles.subTotal}>
        SUBTOTAL
        <span>{formatPrice} VND</span>
      </h4>
      <h4 className={styles.total}>
        TOTAL <span>{formatPrice} VND</span>
      </h4>
      <input placeholder="Enter your coupon"></input>
      <button>
        <i className="fa-solid fa-gift"></i>Apply Coupon
      </button>
    </div>
  );
};
export default CartTotalPrice;
