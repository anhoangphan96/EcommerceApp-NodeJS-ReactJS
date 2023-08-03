import { CSSTransition, TransitionGroup } from "react-transition-group";
import React from "react";
import { useSelector } from "react-redux";
import "./Fade.css";
//Component hiển thị hiệu ứng fade
const Fade = (props) => {
  const showPopup = useSelector((state) => state.popUp.popUpShow);
  const popupProductId =
    useSelector((state) => state.popUp.popUpProductId) !== "";
  return (
    <CSSTransition
      timeout={{ appear: 1, enter: 1, exit: 300 }}
      appear={true}
      in={popupProductId && showPopup}
      classNames="fade"
      mountOnEnter
      unmountOnExit
    >
      <div>{props.children}</div>
    </CSSTransition>
  );
};
export default Fade;
