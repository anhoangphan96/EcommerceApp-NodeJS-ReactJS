import { Outlet } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation";
import Footer from "../Components/Footer";
import PopupLiveChat from "../Components/PopupLiveChat";
import { useNavigation } from "react-router-dom";
import { useState } from "react";
import styles from "./RootLayOut.module.css";

function RootLayout() {
  //Khai báo hook navigation
  const navigation = useNavigation();
  //Khai báo biến để kiểm soát có đang click trên thanh Navbar không
  const [isClickOnNav, setIsClickOnNav] = useState(false);
  //Khi click vào navbar thì set biến trên thành true còn click vào phần main thì thành false
  const clickOnNavHandler = () => {
    setIsClickOnNav((prev) => true);
  };
  const clickOnMain = () => {
    setIsClickOnNav((prev) => false);
  };
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
            <PopupLiveChat />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
