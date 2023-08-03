import Cartlist from "../Components/CartList";
import CartTotalPrice from "../Components/CartTotalPrice";
import styles from "./CartPage.module.css";

const CartPage = function () {
  // Component trả về JSx chứa tiêu đề và phần chứa list sản phẩm của user thêm vào giỏ hàng tương ứng và phần giá tổng
  return (
    <>
      <div className={styles.title}>
        <h2>CART</h2>
        <h4>CART</h4>
      </div>
      <div className={styles.cartContainer}>
        <h3>SHOPPING CART</h3>
        <div className={styles.cartInfor}>
          <Cartlist></Cartlist>
          <CartTotalPrice></CartTotalPrice>
        </div>
      </div>
    </>
  );
};
export default CartPage;
