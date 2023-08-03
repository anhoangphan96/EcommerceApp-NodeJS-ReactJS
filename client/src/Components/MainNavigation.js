import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MainNavigation.module.css";
import { loginActions } from "../redux/store";
import "@fortawesome/fontawesome-free/css/all.min.css";
//Theo yêu cầu đề bài phải dùng useNavigate nên em sẽ dùng useNavigate thay gì dùng NavLink
const MainNavigation = function (props) {
  //Khai báo các hook để sử dụng
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //Khai báo biến có đang đăng nhập hay không lấy dữ liệu từ redux store
  const isLogin = useSelector((state) => state.login.isLogin);
  //Khai báo biến current user data từ redux store
  const [curUserData] = useSelector((state) => state.login.curUser);
  //Khai báo biến lưu Url hiện tại
  const [curUrl, setCurUrl] = useState(null);
  //Các function để điều hướng đến các trang tương ứng khi ấn vào link của từng route trên navbar
  const landToHomeHandler = () => {
    navigate("/");
  };
  const landToShopHandler = () => {
    navigate("/shop");
  };
  const landToCartHandler = () => {
    navigate("/cart");
  };
  const landToLoginHandler = () => {
    navigate("/login?mode=login");
  };

  // Function để thực hiện hành động logout khi click vào nut logout
  const logOutHandler = () => {
    //Dispatch action logout, xóa currentUser khỏi localstorage và điều hướng về trang login
    dispatch(loginActions.ON_LOGOUT());
    localStorage.removeItem("currUser");
    navigate("/login?mode=login");
  };
  //Function để thực hiện hành động click vào Narbar truyền từ rootlayout xuống
  const clickOnNavigationHandler = () => {
    props.clickOnNavHandler();
  };
  // sử dụng useffect để cập nhật state quản lý URL mỗi lần đường link thay đổi
  useEffect(() => {
    setCurUrl(location.pathname);
  }, [location]);
  //JSX trả ra thanh navbar nếu current URL bằng với đường link của route nào thì phần tử navbar đó sẽ nhận class style active
  return (
    <nav className={styles.navBarContainer} onClick={clickOnNavigationHandler}>
      <ul>
        <li
          onClick={landToHomeHandler}
          className={curUrl === "/" ? styles.active : undefined}
        >
          Home
        </li>
        <li
          onClick={landToShopHandler}
          className={curUrl === "/shop" ? styles.active : undefined}
        >
          Shop
        </li>
      </ul>
      <h2>BOUTIQUE</h2>
      <ul>
        <li
          onClick={landToCartHandler}
          className={curUrl === "/cart" ? styles.active : undefined}
        >
          <i className="fa-solid fa-cart-flatbed"></i>
          Cart
        </li>
        {!isLogin && (
          <li
            onClick={landToLoginHandler}
            className={curUrl === "/login" ? styles.active : undefined}
          >
            <i className="fa-solid fa-user-large"></i> Login
          </li>
        )}
        {isLogin && (
          <li>
            <i className="fa-solid fa-user-large"></i> {curUserData.name}{" "}
            <i className="fa-solid fa-caret-down"></i>
          </li>
        )}
        {isLogin && <li onClick={logOutHandler}> ( Logout ) </li>}
      </ul>
    </nav>
  );
};
export default MainNavigation;
