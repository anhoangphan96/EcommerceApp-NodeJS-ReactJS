import { useEffect } from "react";
import Card from "../components/CardContainer/Card";
import InforBoard from "../components/DashBoard/InforBoard";
import ListOrder from "../components/ListOrder/ListOrder";
import styles from "./DashBoard.module.css";
import openSocket from "socket.io-client";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const isLogin = useSelector((state) => state.login.isLogin);
  return (
    <div className={styles.dashBoardContainer}>
      {isLogin && (
        <>
          <h2>Dashboard</h2>
          <InforBoard></InforBoard>
          <Card>
            <ListOrder></ListOrder>
          </Card>
        </>
      )}
    </div>
  );
};
export default DashBoard;
