import { CSSTransition } from "react-transition-group";
import "./Shake.css";
const Shake = (props) => {
  return (
    <CSSTransition
      timeout={1}
      in={props.isShow}
      appear={true}
      classNames="shake"
    >
      {props.children}
    </CSSTransition>
  );
};
export default Shake;
