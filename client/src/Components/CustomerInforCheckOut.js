import styles from "./CustomerInforCheckOut.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const CustomerInforCheckOut = () => {
  const navigate = useNavigate();
  //Component này xây dựng giao diện của 1 form để người dùng nhập thông tin vào khi check out
  const userInfor = useSelector((state) => state.login.curUser);
  console.log(userInfor);
  const listCart = useSelector((state) => state.cart.listCart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [errorMessage, setErrorMessage] = useState({});
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const changeFullNameHandler = (event) => {
    setFullName(event.target.value);
    if (event.target.value.length > 1) {
      setErrorMessage((prev) => {
        return { ...prev, fullName: "" };
      });
    }
  };
  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
    //Do field này trong form create order bị khóa nên ta k cần quản lý phần input lỗi
  };
  const changePhoneNumberHandler = (event) => {
    setPhoneNumber(event.target.value);
    if (event.target.value.length === 10) {
      setErrorMessage((prev) => {
        return { ...prev, phone: "" };
      });
    }
  };
  const changeAddressHandler = (event) => {
    setAddress(event.target.value);
    if (event.target.value.length > 1) {
      setErrorMessage((prev) => {
        return { ...prev, address: "" };
      });
    }
  };
  const placeOrderHandler = async (event) => {
    event.preventDefault();
    //totalPrice phải >0 mới được đặt hàng
    if (totalPrice > 0) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/order/create`,
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userInfor._id,
            email: email,
            fullName: fullName,
            phone: phoneNumber,
            address: address,
            items: listCart,
            totalPrice: totalPrice,
            status: "Waiting for pay",
          }),
        }
      );
      if (response.ok) {
        navigate("/history");
      } else {
        //Nếu trả về lỗi 404 là do có 1 sản phẩm nào đó đã bị hết hàng trong quá trình user chần chừ chưa đặt hàng đã bị ng khác đặt, quay về trang cart để cập nhật
        if (response.status === 404) {
          navigate("/cart");
          //Lỗi validate input thiếu hoặc không đúng định dạng
        } else if (response.status === 400) {
          const errors = await response.json();
          console.log(errors);
          const errorMsg = {};
          for (let property in errors) {
            errorMsg[property] = errors[property].msg;
          }
          setErrorMessage(errorMsg);
        } else if (response.status === 401) {
          navigate("/login?mode=login");
        } else if (response.status === 500) {
          navigate("/servererror");
        }
      }
    }
  };
  useEffect(() => {
    if (userInfor) {
      setFullName(userInfor.fullName);
      setEmail(userInfor.email);
      setPhoneNumber(userInfor.phoneNumber);
    }
  }, [userInfor]);
  return (
    <form className={styles.cusInforForm} onSubmit={placeOrderHandler}>
      <div>
        <label htmlFor="fullName">FULL NAME:</label>
        <input
          id="fullName"
          type="text"
          placeholder="Enter Your Full Name Here!"
          value={fullName}
          onChange={changeFullNameHandler}
        ></input>

        {errorMessage.fullName && (
          <p className={styles.errorMsg}>{errorMessage.fullName}</p>
        )}
      </div>
      <div>
        <label htmlFor="email">EMAIL:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter Your Email Here!"
          value={email}
          disabled
          onChange={changeEmailHandler}
        ></input>
        {errorMessage.email && (
          <p className={styles.errorMsg}>{errorMessage.email}</p>
        )}
      </div>
      <div>
        <label htmlFor="phoneNumber">PHONE NUMBER:</label>
        <input
          id="phoneNumber"
          type="number"
          placeholder="Enter Your Phone Number Here!"
          value={phoneNumber}
          onChange={changePhoneNumberHandler}
        ></input>
        {errorMessage.phone && (
          <p className={styles.errorMsg}>{errorMessage.phone}</p>
        )}
      </div>
      <div>
        <label htmlFor="address">ADDRESS:</label>
        <input
          id="address"
          type="text"
          placeholder="Enter Your Address Here!"
          value={address}
          onChange={changeAddressHandler}
        ></input>
        {errorMessage.address && (
          <p className={styles.errorMsg}>{errorMessage.address}</p>
        )}
      </div>
      <button>Place Order</button>
    </form>
  );
};

export default CustomerInforCheckOut;
