import { Link, useNavigate } from "react-router-dom";
import styles from "./SideBar.module.css";

const SideBar = () => {
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
          <ul>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-home"
                width={24}
                height={24}
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
          <ul>
            <h4>COMPONENTS</h4>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-plus"
                width={24}
                height={24}
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
                width={24}
                height={24}
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
                width={24}
                height={24}
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
              <Link to="#">Table</Link>
              <ul>
                <li>Users</li>
                <li>Products</li>
                <li>History</li>
              </ul>
            </li>
          </ul>

          <ul>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-logout"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                <path d="M9 12h12l-3 -3"></path>
                <path d="M18 15l3 -3"></path>
              </svg>
              <Link to="/login" onClick={logoutHandler}>
                Logout
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};
export default SideBar;
