import NavBarProduct from "../Components/NavBarProduct";
import ProductList from "../Components/ProductList";
import styles from "./ShopPage.module.css";
import { useSelector } from "react-redux";
import { useRouteLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
const ShopPage = function () {
  //Biến lưu loại category lấy từ redux store
  const category = useSelector((state) => state.category.category);
  //Biến lấy data fetch từ API được thực hiện từ Route loader ở trang homepage với id "mainpage"
  const data = useRouteLoaderData("mainpage");
  //Tạo biến giữ array lọc ra sản phẩm theo category, mặc định sẽ hiển thị đủ
  const [filterListProduct, setFilterListProduct] = useState(data);
  //Khi category thay đổi thì filterList sẽ được render lại lọc sản phẩm theo category
  useEffect(() => {
    if (category === "All") {
      setFilterListProduct(data);
    } else {
      setFilterListProduct(
        data.filter((product) => {
          return product.category === category.toLowerCase();
        })
      );
    }
  }, [category]);
  //component trả ra JSX theo yêu cầu thiết kế, truyền props vào product List đã được fill theo category vào ProductList để hiển thị
  return (
    <>
      <div className={styles.title}>
        <h2>SHOP</h2>
        <h3>SHOP</h3>
      </div>
      <div className={styles.filterSection}>
        <NavBarProduct />
        <ProductList productList={filterListProduct} category={category} />
      </div>
    </>
  );
};
export default ShopPage;
