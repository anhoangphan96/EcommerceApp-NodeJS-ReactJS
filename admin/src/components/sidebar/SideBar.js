import { Link, useNavigate } from "react-router-dom";
import styles from "./SideBar.module.css";
import { useState } from "react";

const SideBar = () => {
  const [showListTable, setShowListTable] = useState(false);
  const isLoggedIn = true;
  const navigate = useNavigate();
  const clickToLogout = async () => {
    const response = await fetch(`http://localhost:5000/user/adminlogout`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      navigate("/login");
    }
  };
  const showListTableHandler = () => {
    setShowListTable((prev) => !prev);
  };
  const logoutHandler = () => {
    clickToLogout();
  };

  return (
    <div className={styles.sidebarContainer}>
      <Link to="/">
        <h2>Admin Page</h2>
      </Link>
      {/* Khi nào user login được check authorized admin thì mới thấy được các menu trong sidebar */}
      {isLoggedIn && (
        <>
          <ul className={styles.listDasboard}>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-home"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                stroke-width={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
              </svg>
              <Link to="/">DashBoard</Link>
            </li>
          </ul>
          <ul className={styles.listComponents}>
            <h4>COMPONENTS</h4>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-plus"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                stroke-width={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 5l0 14"></path>
                <path d="M5 12l14 0"></path>
              </svg>
              <Link to="/user">New Product</Link>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-message-2"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                stroke-width={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M8 9h8"></path>
                <path d="M8 13h6"></path>
                <path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z"></path>
              </svg>
              <Link to="/hotel">Customer</Link>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-table"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                stroke-width={2}
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z"></path>
                <path d="M3 10h18"></path>
                <path d="M10 3v18"></path>
              </svg>
              <div onClick={showListTableHandler} className={styles.tableRow}>
                Tables
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-down"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  stroke-width={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M6 9l6 6l6 -6"></path>
                </svg>
              </div>
            </li>
            {showListTable && (
              <ul className={styles.listTables}>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-user"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    stroke-width={2}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                  </svg>
                  <Link>Users</Link>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-package"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    stroke-width={2}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"></path>
                    <path d="M12 12l8 -4.5"></path>
                    <path d="M12 12l0 9"></path>
                    <path d="M12 12l-8 -4.5"></path>
                    <path d="M16 5.25l-8 4.5"></path>
                  </svg>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-history"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    stroke-width={2}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 8l0 4l2 2"></path>
                    <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5"></path>
                  </svg>
                  <Link to="/history">History</Link>
                </li>
              </ul>
            )}
          </ul>
        </>
      )}
    </div>
  );
};
export default SideBar;
