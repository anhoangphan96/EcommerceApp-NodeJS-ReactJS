import styles from "./CustomerInforCheckOut.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
const CustomerInforCheckOut = () => {
  //Component này xây dựng giao diện của 1 form để người dùng nhập thông tin vào khi check out
  const userInfor = useSelector((state) => state.login.curUser);
  const listCart = useSelector((state) => state.cart.listCart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [fullName, setFullName] = useState(userInfor.fullName);
  const [email, setEmail] = useState(userInfor.email);
  const [phoneNumber, setPhoneNumber] = useState(userInfor.phone);
  const [address, setAddress] = useState("");
  const changeFullNameHandler = (event) => {
    setFullName(event.target.value);
  };
  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const changePhoneNumberHandler = (event) => {
    setPhoneNumber(event.target.value);
  };
  const changeAddressHandler = (event) => {
    setAddress(event.target.value);
  };
  const placeOrderHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/order/create`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        fullName: fullName,
        phone: phoneNumber,
        address: address,
        items: listCart,
        totalPrice: totalPrice,
        status: "Waiting for pay",
      }),
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <form className={styles.cusInforForm} onSubmit={placeOrderHandler}>
      <label htmlFor="fullName">FULL NAME:</label>
      <input
        id="fullName"
        type="text"
        placeholder="Enter Your Full Name Here!"
        value={fullName}
        onChange={changeFullNameHandler}
      ></input>
      <label htmlFor="email">EMAIL:</label>
      <input
        id="email"
        type="email"
        placeholder="Enter Your Email Here!"
        value={email}
        onChange={changeEmailHandler}
      ></input>
      <label htmlFor="phoneNumber">PHONE NUMBER:</label>
      <input
        id="phoneNumber"
        type="number"
        placeholder="Enter Your Phone Number Here!"
        value={phoneNumber}
        onChange={changePhoneNumberHandler}
      ></input>
      <label htmlFor="address">ADDRESS:</label>
      <input
        id="address"
        type="text"
        placeholder="Enter Your Address Here!"
        value={address}
        onChange={changeAddressHandler}
      ></input>
      <button>Place Order</button>
    </form>
  );
};

export default CustomerInforCheckOut;
