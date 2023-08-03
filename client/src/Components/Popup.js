import React from "react";
import "./Popup.module.css";
import ReactDOM from "react-dom";
import styles from "./Popup.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../redux/store";
import { useNavigate } from "react-router-dom";
import Fade from "./Transitions/Fade";
import { useFormatPrice } from "./customHooks/useFormatPrice";
// Xây dựng backdrop với lớp phủ màu đen cùng với animation <Fade>
const Backdrop = () => {
  return (
    <Fade>
      <div className={styles.backdrop}></div>
    </Fade>
  );
};
//Xây dựng Popup Modal với thông tin của sản phẩm được click vào
const Modal = (props) => {
  const dispatch = useDispatch();
  //sử dụng custom hook useFormatPrice để format price đúng định dạng
  let priceOrigi = "";
  if (props.dataProduct) {
    priceOrigi = props.dataProduct.price;
  }
  let price = useFormatPrice(priceOrigi);
  const navigate = useNavigate();
  //Dispatch action showPopUp từ true => false đễ đóng popup
  const exitPopupHandler = () => {
    dispatch(popupActions.showPopup());
    dispatch(popupActions.getDataPopup(""));
  };
  //Khi ấn vào view detail user sẽ được chuyển đến trang chi tiết của sản phẩm tương ứng
  const navigatetoProductHandler = () => {
    dispatch(popupActions.showPopup());
    dispatch(popupActions.getDataPopup(""));
    navigate(`/detail/${props.dataProduct._id.$oid}`);
  };

  return (
    <Fade>
      {props.dataProduct && (
        <div className={styles.modalPopup}>
          <img src={props.dataProduct.img1}></img>
          <div className={styles.popupContent}>
            <h3>{props.dataProduct.name}</h3>
            <h4>{price} VND</h4>
            <p>{props.dataProduct.short_desc}</p>
            <button onClick={navigatetoProductHandler}>
              <i className="fa-solid fa-cart-shopping"></i> View Detail
            </button>
          </div>
          <i className="fa-solid fa-xmark" onClick={exitPopupHandler}></i>
        </div>
      )}
    </Fade>
  );
};
//Component chính là Popup được xây dựng bằng react portal của 2 thành phần con là backdrop modal
const Popup = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Modal dataProduct={props.dataProduct[0]} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
export default Popup;
