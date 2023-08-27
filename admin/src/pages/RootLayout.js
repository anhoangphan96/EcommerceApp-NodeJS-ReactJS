import SideBar from "../components/Sidebar/SideBar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./RootLayout.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/reduxstore";
const RootLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const curUser = useSelector((state) => state.login.curUser);
  console.log(curUser);
  const loginHandler = () => {
    navigate("/login");
  };
  const logoutHandler = async () => {
    const response = await fetch(`http://localhost:5000/user/adminlogout`);
    console.log(response);
    if (response.ok) {
      dispatch(loginActions.ON_LOGOUT());
      navigate("/login");
    }
  };
  return (
    <div className={styles.mainLayout}>
      <SideBar></SideBar>
      <main>
        <div className={styles.useraccess}>
          {!isLogin && <button onClick={loginHandler}>Login</button>}
          {isLogin && (
            <>
              <h4>Hello {curUser?.fullName}</h4>
              <button onClick={logoutHandler}>Logout</button>
            </>
          )}
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
