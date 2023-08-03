import styles from "./NavBarProduct.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryActions } from "../redux/store";

const NavBarProduct = () => {

  const dispatch = useDispatch();
  //lưu biến category lấy từ Redux store
  const category = useSelector((state) => state.category.category);
  // Mỗi khi click vào 1 loại category từ thanh productNavBar ta sẽ dispatch action để set Category thành loại category đó
  const chooseCategoryHandler = (event) => {
    //Chỉ set khi vào tagName H5 là phần tử của các category
    if (event.target.tagName === "H5") {
      dispatch(categoryActions.setCategory(event.target.textContent));
    }
  };
  //component tạo JSX thanh điều hướng để lựa chọn category phù hợp, category bằng loại nào thì className của element đó sẽ có active
  return (
    <div className={styles.container} onClick={chooseCategoryHandler}>
      <h2>CATEGORIES</h2>
      <h3>APPLE</h3>
      <h5 className={category === "All" ? styles.isActive : undefined}>All</h5>
      <h4>IPHONE & MAC</h4>
      <h5 className={category === "Iphone" ? styles.isActive : undefined}>
        Iphone
      </h5>
      <h5 className={category === "Ipad" ? styles.isActive : undefined}>
        Ipad
      </h5>
      <h5 className={category === "Macbook" ? styles.isActive : undefined}>
        Macbook
      </h5>
      <h4>WIRELESS</h4>
      <h5 className={category === "Airpod" ? styles.isActive : undefined}>
        Airpod
      </h5>
      <h5 className={category === "Watch" ? styles.isActive : undefined}>
        Watch
      </h5>
      <h4>OTHER</h4>
      <h5 className={category === "Mouse" ? styles.isActive : undefined}>
        Mouse
      </h5>
      <h5 className={category === "Keyboard" ? styles.isActive : undefined}>
        Keyboard
      </h5>
      <h5 className={category === "Others" ? styles.isActive : undefined}>
        Others
      </h5>
    </div>
  );
};
export default React.memo(NavBarProduct);
