import CustomerInforCheckOut from "../Components/CustomerInforCheckOut";
import TotalOrderInfor from "../Components/TotalOrderInfor";
import styles from "./CheckOutPage.module.css";
const CheckOutPage = function () {
  //Component Page trả ra JSX để hiển thị thông tiêu đề, 1 form thông tin check out, và tổng thông tin đơn hàng cuối cùng của khách
  return (
    <>
      <div className={styles.title}>
        <h2>CHECKOUT</h2>
        <h4>
          <span>HOME</span> / <span>CART</span> / CHECKOUT
        </h4>
      </div>
      <div className={styles.checkOutContainer}>
        <h3>BILLING DETAILS</h3>
        <div className={styles.checkOutInfor}>
          <CustomerInforCheckOut></CustomerInforCheckOut>
          <TotalOrderInfor></TotalOrderInfor>
        </div>
      </div>
    </>
  );
};
export default CheckOutPage;
