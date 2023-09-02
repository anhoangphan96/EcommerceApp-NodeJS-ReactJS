import { useSelector } from "react-redux";
import styles from "./HistoryItem.module.css";
import { useNavigate } from "react-router-dom";
import { useFormatPrice } from "../customHooks/useFormatPrice";
const HistoryItem = (props) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.login.curUser);
  const totalPrice = useFormatPrice(props.hisItem.totalPrice);
  const viewDetailHandler = () => {
    navigate(`/history/${props.hisItem._id}`);
  };
  return (
    <tr id={props.hisItem._id} className="cartRow">
      <td className={styles.hisId}>{props.hisItem._id}</td>
      <td className={styles.userId}>{userData._id}</td>
      <td className={styles.userName}>{props.hisItem.fullName}</td>
      <td className={styles.phone}>{props.hisItem.phone}</td>
      <td className={styles.address}>{props.hisItem.address}</td>
      <td className={styles.total}>
        {totalPrice}
        <br />
        VND
      </td>
      <td className={styles.delivery}>Waiting for progressing</td>
      <td className={styles.status}>{props.hisItem.status}</td>
      <td className={styles.detail}>
        <button onClick={viewDetailHandler}>
          View <i className="fa-sharp fa-solid fa-right-long"></i>
        </button>
      </td>
    </tr>
  );
};
export default HistoryItem;
