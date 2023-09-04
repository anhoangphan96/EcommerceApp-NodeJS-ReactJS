import Card from "../components/CardContainer/Card";
import styles from "./UserList.module.css";
import { useState, useEffect } from "react";
import UserItem from "../components/UserList/UserItem";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/reduxstore";
const UserList = () => {
  const [listUser, setListUser] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = useOutletContext();
  const getListUser = async () => {
    const response = await fetch(`http://localhost:5000/user/listuser`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setListUser(data);
    } else {
      if (response.status === 401) {
        dispatch(loginActions.ON_LOGOUT());
        logoutHandler();
        navigate("/login");
      } else if (response.status === 500) {
        navigate("/servererror");
      }
    }
  };
  useEffect(() => {
    getListUser();
  }, []);
  return (
    <Card className={styles.userListInfor}>
      <div className={styles.userListContainer}>
        <div className={styles.title}>
          <h2>Users List</h2>
        </div>
        <table className={styles.tabledata}>
          <tbody>
            <tr>
              <th className={styles.idColumn}>ID</th>
              <th className={styles.emailColumn}>
                <span>Email</span>
              </th>

              <th className={styles.fullNameColumn}>
                <span>Full Name</span>
              </th>
              <th className={styles.phoneColumn}>
                <span>Phone Number</span>
              </th>

              <th className={styles.typeColumn}>
                <span>User Role</span>
              </th>
              <th>
                <span>Action</span>
              </th>
            </tr>
            {listUser.length > 0 &&
              listUser.map((user) => (
                <UserItem
                  user={user}
                  key={user._id}
                  getListUser={getListUser}
                ></UserItem>
              ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
export default UserList;
