import { CSSTransition } from "react-transition-group";

import "./ZoomOut.css";
//Component để giúp hiển thị hiệu ứng ZoomOut
const ZoomOut = (props) => {
  return (
    <CSSTransition timeout={1} in={true} appear={true} classNames="zoomOut">
      {props.children}
    </CSSTransition>
  );
};
export default ZoomOut;
