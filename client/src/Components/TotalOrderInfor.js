import styles from "./TotalOrderInfor.module.css";
import { useSelector } from "react-redux";
import { useFormatPrice } from "./customHooks/useFormatPrice";
import OrderPriceItem from "./OrderPriceItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/store";
const TotalOrderInfor = () => {
  const dispatch = useDispatch();
  const totalPrice = useFormatPrice(
    useSelector((state) => state.cart.totalPrice) ?? 0
  );
  //Khai báo list cart được filter theo email của user đang đăng nhập
  const listCart = useSelector((state) => state.cart.listCart);
  const getListCart = async () => {
    const response = await fetch(`http://localhost:5000/user/listcart`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    dispatch(cartActions.UPDATECART(data.cart));
  };
  //Nếu như lở f5 hay load lại trang checkout thì phải check coi đã fetch data cart chưa nếu chưa sẽ fetch lại
  useEffect(() => {
    if (!totalPrice) {
      getListCart();
    }
  }, []);

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
