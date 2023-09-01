import styles from "./CartTotalPrice.module.css";
import { useSelector } from "react-redux";
import { useFormatPrice } from "./customHooks/useFormatPrice";

const CartTotalPrice = (props) => {
  // khai biến chứa tổng price lấy từ redux store
  const totalPrice = useSelector((state) => state.cart.totalPrice);
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
