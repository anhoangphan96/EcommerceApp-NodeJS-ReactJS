import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupModal from "../Modal/PopupModal";
import formatPrice from "../../helper/formatPrice";
import styles from "./ProrductItem.module.css";
const ProductItem = (props) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteBtn, setshowDeleteBtn] = useState(true);
  const [message, setMessage] = useState("Please confirm to delete this Room!");
  const updateHandler = () => {
    navigate(`/products/form?mode=update&id=${props.product._id}`);
  };
  const deleteHandler = async () => {
    const response = await fetch(
      `http://localhost:5000/product/delete?id=${props.product._id}`,
      {
        credentials: "include",
        method: "delete",
      }
    );
    if (response.ok) {
      props.getListProducts();
    }
  };
  //Function để show popup confirm delete
  const showPopupHandler = () => {
    setShowPopup(true);
  };
  const closeHandler = () => {
    //Nếu như sau khi xóa xong(không hiện nút delete nửa) mà bấm close thì sẽ render lại list để lấy list Room sau khi xóa
    if (!showDeleteBtn) {
      props.getListRoom();
    }
    setMessage("Please confirm to delete this Room!");
    setshowDeleteBtn(true);
    setShowPopup(false);
  };
  return (
    <>
      <tr>
        <td>{props.product._id} </td>
        <td>{props.product.name} </td>
        <td>{formatPrice(props.product.price)} </td>
        <td>
          <img src={props.product.img1} width={60} />
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
