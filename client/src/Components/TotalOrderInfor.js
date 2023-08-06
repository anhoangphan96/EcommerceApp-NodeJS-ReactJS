import styles from "./TotalOrderInfor.module.css";
import { useSelector } from "react-redux";
import { useFormatPrice } from "./customHooks/useFormatPrice";
import OrderPriceItem from "./OrderPriceItem";

const TotalOrderInfor = () => {
  //Khai báo email của current User nếu không có user đăng nhập thì trả về rỗng
  const emailCurUser = useSelector((state) => {
    if (state.login.isLogin) {
      return state.login.curUser.email;
    } else {
      return "";
    }
  });
  //Khai báo list cart được filter theo email của user đang đăng nhập
  const listCart = useSelector((state) => state.cart.listCart);
  //sử dụng custom hook để format lại giá tiền
  const totalPrice = useFormatPrice(
    useSelector((state) => state.cart.totalPrice) ?? 0
  );
  //component trả về JSX để hiển thị thông tin cuối cùng của đơn hàng, trong đó mỗi OrderpriceItem sẽ hiển thị mỗi dòng là 1 sản phẩm
  return (
    <div className={styles.container}>
      <h3>YOUR ORDER</h3>
      <ul>
        {listCart.map((item) => (
          <OrderPriceItem key={item._id} item={item}></OrderPriceItem>
        ))}
      </ul>
      <h4 className={styles.finalPrice}>
        <span>TOTAL</span>
        <span className={styles.totalprice}> {totalPrice}VND</span>
      </h4>
    </div>
  );
};

export default TotalOrderInfor;
