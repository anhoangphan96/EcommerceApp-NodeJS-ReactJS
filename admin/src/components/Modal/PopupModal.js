import styles from "./PopupModal.module.css";
import ReactDOM from "react-dom";
import Card from "../CardContainer/Card";
const Backdrop = () => {
  return <div className={styles.backdrop}></div>;
};
const Modal = (props) => {
  return (
    <div className={styles.modal}>
      <Card className={styles.popupModal}>
        <h3>Message Box</h3>
        <p>{props.message}</p>
        {props.children}
      </Card>
    </div>
  );
};
const PopupModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(
        <Modal message={props.message}>{props.children}</Modal>,
        document.getElementById("modal")
      )}
    </>
  );
};
export default PopupModal;
