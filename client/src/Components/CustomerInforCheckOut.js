import { Form } from "react-router-dom";
import styles from "./CustomerInforCheckOut.module.css";

const CustomerInforCheckOut = () => {
  //Component này xây dựng giao diện của 1 form để người dùng nhập thông tin vào khi check out
  return (
    <Form className={styles.cusInforForm}>
      <label htmlFor="fullName">FULL NAME:</label>
      <input
        id="fullName"
        type="text"
        placeholder="Enter Your Full Name Here!"
      ></input>
      <label htmlFor="email">EMAIL:</label>
      <input
        id="email"
        type="email"
        placeholder="Enter Your Email Here!"
      ></input>
      <label htmlFor="phoneNumber">PHONE NUMBER:</label>
      <input
        id="phoneNumber"
        type="number"
        placeholder="Enter Your Phone Number Here!"
      ></input>
      <label htmlFor="address">ADDRESS:</label>
      <input
        id="address"
        type="text"
        placeholder="Enter Your Address Here!"
      ></input>
      <button>Place Order</button>
    </Form>
  );
};

export default CustomerInforCheckOut;
