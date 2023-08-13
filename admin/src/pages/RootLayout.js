import SideBar from "../components/Sidebar/SideBar";
import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";
import { useState } from "react";
const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <div className={styles.mainLayout}>
      <SideBar></SideBar>
      <main>
        <div className={styles.useraccess}>
          {!isLoggedIn && <button>Login</button>}
          {isLoggedIn && (
            <>
              <h4>Hello User</h4>
              <button>Logout</button>
            </>
          )}
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
