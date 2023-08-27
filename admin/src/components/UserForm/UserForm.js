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
    const response = await fetch(`http://localhost:5000/user/adminlogin`, {
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
      const error = await response.json();
      setErrorMessage(error.message);
    } else {
      const data = await response.json();
      console.log(data);
      dispatch(loginActions.ON_LOGIN(data));
      navigate("/");
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
        <input
          type="password"
          placeholder="Password"
          onChange={passwordInputHandler}
          value={password}
        ></input>
        {errorMessage && <p className={styles.erroMessage}>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default UserForm;
