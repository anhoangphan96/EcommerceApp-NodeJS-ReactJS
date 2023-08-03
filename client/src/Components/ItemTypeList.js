import styles from "./ItemTypeList.module.css";
import { useNavigate } from "react-router-dom";
const ItemTypeList = () => {
  const navigate = useNavigate();
  //Khi click vào bất cứ type nào trong list cũng sẽ chuyển đến trang shop page
  const landToShopPage = () => {
    navigate("/shop");
  };
  //Component trả về JSX để hiển thị các loại list type.
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>CAREFULLY CREATED COLLECTIONS</h3>
        <h2>BROWSE OUR CATEGORIES</h2>
      </div>
      <div className={styles.listItemType}>
        <img
          src="./product_1.png"
          alt="Iphone List"
          onClick={landToShopPage}
        ></img>
        <img
          src="./product_2.png"
          alt="Mac List"
          onClick={landToShopPage}
        ></img>
      </div>
      <div className={styles.listItemType}>
        <img
          src="./product_3.png"
          alt="Ipad List"
          onClick={landToShopPage}
        ></img>
        <img
          src="./product_4.png"
          alt="Watch List"
          onClick={landToShopPage}
        ></img>
        <img
          src="./product_5.png"
          alt="AirPods List"
          onClick={landToShopPage}
        ></img>
      </div>
    </div>
  );
};
export default ItemTypeList;
