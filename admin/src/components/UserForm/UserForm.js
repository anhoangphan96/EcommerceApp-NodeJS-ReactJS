import { useState } from "react";
import styles from "./UserForm.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/reduxstore";
const UserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailInputHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordInputHandler = (event) => {
    setPassword(event.target.value);
  };
  const submitFormHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/adminlogin`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      if (response.status === 400) {
        const error = await response.json();
        const errMsg = {};
        for (let property in error) {
          errMsg[property] = error[property].msg;
        }
        setErrorMessage(errMsg);
      } else if (response.status === 401 || response.status === 403) {
        const error = await response.json();
        setErrorMessage({ password: error.message });
      }
    } else {
      const data = await response.json();
      dispatch(loginActions.ON_LOGIN(data));
      if (data.role === "counselor") {
        navigate("/customerchat");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form className={styles.formUser} onSubmit={submitFormHandler}>
        <input
          type="text"
          placeholder="Email"
          onChange={emailInputHandler}
          value={email}
        ></input>
        {errorMessage.email && (
          <p className={styles.erroMessage}>{errorMessage.email}</p>
        )}
        <input
          type="password"
          placeholder="Password"
          onChange={passwordInputHandler}
          value={password}
        ></input>
        {errorMessage.password && (
          <p className={styles.erroMessage}>{errorMessage.password}</p>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default UserForm;
