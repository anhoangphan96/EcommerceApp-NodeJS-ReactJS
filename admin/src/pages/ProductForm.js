import { useEffect, useState } from "react";
import styles from "./ProductForm.module.css";
import {
  Form,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/reduxstore";
import PopupModal from "../components/Modal/PopupModal";
const ProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = useOutletContext();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [searchParms] = useSearchParams();
  const mode = searchParms.get("mode");
  const [errorMessage, setErrorMessage] = useState({});
  const [nameInput, setNameInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [countInput, setCountInput] = useState("");
  const [shortdescInput, setShortdescInput] = useState("");
  const [longdescInput, setLongdescInput] = useState("");
  const [listPicture, setListPicture] = useState("");
  const nameInputHandler = (event) => {
    setNameInput(event.target.value);
    if (event.target.value.length > 0) {
      setErrorMessage((prev) => {
        return { ...prev, name: "" };
      });
    }
  };
  const categoryInputHandler = (event) => {
    setCategoryInput(event.target.value);
    if (event.target.value.length > 0) {
      setErrorMessage((prev) => {
        return { ...prev, category: "" };
      });
    }
  };
  const priceInputHandler = (event) => {
    setPriceInput(event.target.value);
    if (event.target.value.length > 0) {
      setErrorMessage((prev) => {
        return { ...prev, price: "" };
      });
    }
  };
  const countInputHandler = (event) => {
    setCountInput(event.target.value);
    if (event.target.value.length > 0) {
      setErrorMessage((prev) => {
        return { ...prev, count: "" };
      });
    }
  };
  const shortdescInputHandler = (event) => {
    setShortdescInput(event.target.value);
    if (event.target.value.length > 0) {
      setErrorMessage((prev) => {
        return { ...prev, shortDesc: "" };
      });
    }
  };
  const longdescInputHandler = (event) => {
    setLongdescInput(event.target.value);
    if (event.target.value.length > 0) {
      setErrorMessage((prev) => {
        return { ...prev, longDesc: "" };
      });
    }
  };
  const picturesInputHandler = (event) => {
    console.log(event.target.files);
    setListPicture(event.target.files);
    if (event.target.files.length > 0 && event.target.files.length < 6) {
      setErrorMessage((prev) => {
        return { ...prev, picture: "" };
      });
    }
  };
  const getDataProd = async () => {
    if (mode === "add") {
      return;
    } else if (mode === "update") {
      const response = await fetch(
        `http://localhost:5000/product/formupdate/${searchParms.get("id")}`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setNameInput(data.name);
        setCategoryInput(data.category);
        setPriceInput(data.price);
        setCountInput(data.count);
        setShortdescInput(data.short_desc);
        setLongdescInput(data.long_desc);
      } else {
        if (response.status === 401) {
          dispatch(loginActions.ON_LOGOUT());
          logoutHandler();
          navigate("/login");
        } else if (response.status === 500) {
          navigate("/servererror");
        }
      }
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const dataText = {
      name: nameInput,
      category: categoryInput,
      price: priceInput,
      count: countInput,
      shortDesc: shortdescInput,
      longDesc: longdescInput,
    };
    const pictureFiles = listPicture;
    if (mode === "add") {
      const formData = new FormData();
      formData.append("dataText", JSON.stringify(dataText));
      for (let i = 0; i < pictureFiles.length; i++) {
        formData.append("pictures", pictureFiles[i]);
      }
      console.log(formData);
      const response = await fetch(`http://localhost:5000/product/create`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (response.ok) {
        const resMes = await response.json();
        setShowPopup(true);
        setMessage(resMes.message);
      } else {
        if (response.status === 400) {
          const errors = await response.json();
          console.log(errors);
          const errMsg = {};
          for (let property in errors) {
            errMsg[property] = errors[property].msg;
          }
          setErrorMessage(errMsg);
        } else if (response.status === 422) {
          const pictureError = await response.json();
          setErrorMessage((prev) => {
            return { ...prev, picture: pictureError.message };
          });
        } else if (response.status === 401) {
          dispatch(loginActions.ON_LOGOUT());
          logoutHandler();
          navigate("/login");
        } else if (response.status === 500) {
          navigate("/servererror");
        }
      }
    } else if (mode === "update") {
      const response = await fetch(
        `http://localhost:5000/product/formupdate/${searchParms.get("id")}`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataText),
        }
      );
      if (response.ok) {
        const resMes = await response.json();
        setShowPopup(true);
        setMessage(resMes.message);
      } else {
        if (response.status === 400) {
          const errors = await response.json();
          console.log(errors);
          const errMsg = {};
          for (let property in errors) {
            errMsg[property] = errors[property].msg;
          }
          setErrorMessage(errMsg);
        } else if (response.status === 401) {
          dispatch(loginActions.ON_LOGOUT());
          logoutHandler();
          navigate("/login");
        } else if (response.status === 500) {
          navigate("/servererror");
        }
      }
    }
  };
  const closeHandler = () => {
    setMessage("");
    setShowPopup(false);
    navigate("/products");
  };
  useEffect(() => {
    getDataProd();
  }, []);
  return (
    <div className={styles.container}>
      <Form className={styles.prodForm} onSubmit={submitHandler} method="POST">
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Product Name"
            className={styles.nameInput}
            value={nameInput}
            onChange={nameInputHandler}
          />
          {errorMessage.name && (
            <p className={styles.errorMsg}>{errorMessage.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            placeholder="Enter Category"
            className={styles.categoryInput}
            value={categoryInput}
            onChange={categoryInputHandler}
          />
          {errorMessage.category && (
            <p className={styles.errorMsg}>{errorMessage.category}</p>
          )}
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            placeholder="Enter Price"
            className={styles.priceInput}
            value={priceInput}
            onChange={priceInputHandler}
          />
          {errorMessage.price && (
            <p className={styles.errorMsg}>{errorMessage.price}</p>
          )}
        </div>
        <div>
          <label htmlFor="count">Count(Inventory)</label>
          <input
            id="count"
            type="number"
            placeholder="Enter Count"
            className={styles.countInput}
            value={countInput}
            onChange={countInputHandler}
          />
          {errorMessage.count && (
            <p className={styles.errorMsg}>{errorMessage.count}</p>
          )}
        </div>
        <div>
          <label htmlFor="short_desc">Short Description</label>
          <textarea
            id="short_desc"
            placeholder="Enter Short Description"
            className={styles.shortdesc}
            value={shortdescInput}
            rows={3}
            onChange={shortdescInputHandler}
          />
          {errorMessage.shortDesc && (
            <p className={styles.errorMsg}>{errorMessage.shortDesc}</p>
          )}
        </div>
        <div>
          <label htmlFor="long_desc">Long description</label>
          <textarea
            id="long_desc"
            placeholder="Enter Long Description"
            className={styles.longdesc}
            rows={6}
            value={longdescInput}
            onChange={longdescInputHandler}
          />
          {errorMessage.longDesc && (
            <p className={styles.errorMsg}>{errorMessage.longDesc}</p>
          )}
        </div>
        {mode === "add" && (
          <div>
            <label htmlFor="images">Upload images (5 images)</label>
            <input
              id="images"
              type="file"
              className={styles.fileInput}
              multiple
              onChange={picturesInputHandler}
            />
            {errorMessage.picture && (
              <p className={styles.errorMsg}>{errorMessage.picture}</p>
            )}
          </div>
        )}
        <button className={styles.submitBtn}>Submit</button>
      </Form>

      {showPopup && (
        <PopupModal message={message}>
          <div className={styles.popupbuttons}>
            <button className={styles.closeBtn} onClick={closeHandler}>
              Close
            </button>
          </div>
        </PopupModal>
      )}
    </div>
  );
};
export default ProductForm;
