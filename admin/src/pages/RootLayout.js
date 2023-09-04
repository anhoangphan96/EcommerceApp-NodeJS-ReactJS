import SideBar from "../components/Sidebar/SideBar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./RootLayout.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/reduxstore";
const RootLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const curUser = useSelector((state) => state.login.curUser);
  const loginHandler = () => {
    navigate("/login");
  };
  const logoutHandler = async () => {
    const response = await fetch(`http://localhost:5000/user/adminlogout`, {
      credentials: "include",
    });
    if (response.ok) {
      dispatch(loginActions.ON_LOGOUT());
      navigate("/login");
    }
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
      if (dataUser.role === "counselor") {
        navigate("/customerchat");
      }
    } else if (response.status === 401) {
      navigate("/login");
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
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
