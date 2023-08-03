import styles from "./Banner.module.css";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const navigate = useNavigate();
  //Function điều hướng đến shopage
  const browseHandler = () => {
    navigate("/shop");
  };
  //JSX trả ra thông tin của banner tiêu đề và nút để đến shopage
  return (
    <div className={styles.container}>
      <div className={styles.bannerContent}>
        <h3>NEW INSPIRATION 2020</h3>
        <h2>20% OFF ON NEW SEASON</h2>
        <button onClick={browseHandler}> Browse collections</button>
      </div>
    </div>
  );
};
export default Banner;
