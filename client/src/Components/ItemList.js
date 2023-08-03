import Item from "./Item";
import styles from "./ItemList.module.css";
import { popupActions } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";

const ItemList = (props) => {
  const dispatch = useDispatch();
  //State quản lý showPopup được lấy ra từ redux store
  const showPopup = useSelector((state) => state.popUp.popUpShow);
  //State quản lý id của propduct được click vào lấy ra từ redux store
  const popupProductId = useSelector((state) => state.popUp.popUpProductId);
  //Xây dựng function chọn 1 item để show lên popup
  //Có thể thoát backdrop bằng cách click ra ngoài backdrop hoặc nhấn nút x
  const clickItemHandler = (event) => {
    //Nếu như click vào section item list và có chứa số id sản phẩm thì dispatch action showpopup để điều chỉnh state thành true
    if (event.target.closest("div").id) {
      dispatch(popupActions.showPopup());
      dispatch(popupActions.getDataPopup(event.target.closest("div").id));
    }
    //Nếu như showpopup đang true và click ra ngoài backdrop thì sẽ chuyển state thành false để đóng (dấu x nằm ở file popup.js)
    if (showPopup && event.target.classList.value.includes("backdrop")) {
      dispatch(popupActions.showPopup());
      dispatch(popupActions.getDataPopup(""));
    }
  };
  //JSX chứa các thông tin trong phần Item list gồm tiêu đề, div chứa các item được render từ Item.js và Popup thông tin product click vào
  return (
    <div className={styles.container} onClick={clickItemHandler}>
      <div className={styles.header}>
        <h3>MADE THE HARD WAY</h3>
        <h2>TOP TRENDING PRODUCTS</h2>
      </div>
      <div className={styles.itemList}>
        {props.dataProduct.map((product) => {
          return <Item key={product._id.$oid} product={product}></Item>;
        })}
      </div>
      {
        <Popup
          dataProduct={props.dataProduct.filter(
            (product) => product._id.$oid === popupProductId
          )}
        ></Popup>
      }
    </div>
  );
};
export default ItemList;
