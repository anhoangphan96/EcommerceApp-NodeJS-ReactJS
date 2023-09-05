import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import PopupModal from "../Modal/PopupModal";
import formatPrice from "../../helper/formatPrice";
import styles from "./ProrductItem.module.css";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/reduxstore";
const ProductItem = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = useOutletContext();
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteBtn, setshowDeleteBtn] = useState(true);
  const [message, setMessage] = useState(
    "Please confirm to delete this Product!"
  );
  const updateHandler = () => {
    navigate(`/products/form?mode=update&id=${props.product._id}`);
  };
  const deleteHandler = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/delete?id=${props.product._id}`,
      {
        credentials: "include",
        method: "delete",
      }
    );
    if (response.ok) {
      setshowDeleteBtn(false);
      const newMessage = await response.json();
      setMessage(newMessage.message);
    } else {
      if (response.status === 400) {
        setshowDeleteBtn(false);
        const newMessage = await response.json();
        setMessage(newMessage.message);
      } else if (response.status === 401) {
        dispatch(loginActions.ON_LOGOUT());
        logoutHandler();
        navigate("/login");
      } else if (response.status === 500) {
        navigate("/servererror");
      }
    }
  };
  //Function để show popup confirm delete
  const showPopupHandler = () => {
    setShowPopup(true);
  };
  const closeHandler = () => {
    //Nếu như sau khi xóa xong(không hiện nút delete nửa) mà bấm close thì sẽ render lại list để lấy list Room sau khi xóa
    if (!showDeleteBtn) {
      props.getListProducts();
    }
    setMessage("Please confirm to delete this Product!");
    setshowDeleteBtn(true);
    setShowPopup(false);
  };
  return (
    <>
      <tr className={styles.rowContent}>
        <td>{props.product._id} </td>
        <td>{props.product.name} </td>
        <td>{formatPrice(props.product.price)} </td>
        <td>
          <img
            src={
              props.product.img1.includes("https://firebasestorage")
                ? props.product.img1
                : process.env.REACT_APP_BACKEND_URL + props.product.img1
            }
          />
        </td>
        <td>{props.product.category}</td>
        <td>
          <button className={styles.updateBtn} onClick={updateHandler}>
            Update
          </button>
          <button className={styles.deleteBtn} onClick={showPopupHandler}>
            Delete
          </button>
        </td>
      </tr>
      {showPopup && (
        <PopupModal message={message}>
          <div className={styles.popupbuttons}>
            <button className={styles.closeBtn} onClick={closeHandler}>
              Close
            </button>
            {showDeleteBtn && (
              <button className={styles.deleteBtn} onClick={deleteHandler}>
                Delete
              </button>
            )}
          </div>
        </PopupModal>
      )}
    </>
  );
};
export default ProductItem;
