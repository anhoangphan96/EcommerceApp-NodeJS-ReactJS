import Card from "../components/CardContainer/Card";
import InforBoard from "../components/DashBoard/InforBoard";
import ListOrder from "../components/ListOrder/ListOrder";
import styles from "./DashBoard.module.css";

const DashBoard = () => {
  return (
    <div className={styles.dashBoardContainer}>
      <h2>Dashboard</h2>
      <InforBoard></InforBoard>
      <Card>
        <ListOrder></ListOrder>
      </Card>
    </div>
  );
};
export default DashBoard;
