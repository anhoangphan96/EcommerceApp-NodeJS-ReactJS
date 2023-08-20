import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation";
import Footer from "../Components/Footer";
import PopupLiveChat from "../Components/PopupLiveChat";
import { useEffect, useState } from "react";
import styles from "./RootLayOut.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../redux/store";
import openSocket from "socket.io-client";
function RootLayout() {
  //Khai báo hook navigation
  const navigate = useNavigate();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //Khai báo biến để kiểm soát có đang click trên thanh Navbar không
  const [isClickOnNav, setIsClickOnNav] = useState(false);
  const [socket, setSocket] = useState(null);
  const curUser = useSelector((state) => state.login.curUser);
  const id = curUser?.id;
  console.log(id);
  //Khi click vào navbar thì set biến trên thành true còn click vào phần main thì thành false
  const clickOnNavHandler = () => {
    setIsClickOnNav((prev) => true);
  };
  const clickOnMain = () => {
    setIsClickOnNav((prev) => false);
  };

  const checkLogin = async () => {
    const response = await fetch(`http://localhost:5000/user/infor`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    if (response.ok) {
      const dataUser = await response.json();
      dispatch(loginActions.ON_LOGIN(dataUser));
    }
  };
  useEffect(() => {
    if (id) {
      const socketconnect = openSocket("http://localhost:5000");
      setSocket(socketconnect);
      socketconnect.on("sendMessage", (message) => {
        console.log(message);
      });
    }
  }, [id]);

  useEffect(() => {
    checkLogin();
  }, []);
  //Component trả về layout gồm thanh navbar, footer, và main gồm các nội dung chính ở các router còn lại, ngoài ra còn có popup livechat ở gốc màn hinh
  return (
    <>
      <MainNavigation clickOnNavHandler={clickOnNavHandler} />
      <main onClick={clickOnMain}>
        {navigation.state === "loading" && isClickOnNav ? (
          <p className={styles.loadingMessage}>...Loading</p>
        ) : (
          <>
            <Outlet />
            <PopupLiveChat socket={socket} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
