import { useEffect, useState } from "react";
import styles from "./ProductForm.module.css";
import { Form, useNavigate, useSearchParams } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();
  const [searchParms] = useSearchParams();
  const mode = searchParms.get("mode");

  const [nameInput, setNameInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [shortdescInput, setShortdescInput] = useState("");
  const [longdescInput, setLongdescInput] = useState("");
  const [listPicture, setListPicture] = useState("");
  const nameInputHandler = (event) => {
    setNameInput(event.target.value);
  };
  const categoryInputHandler = (event) => {
    setCategoryInput(event.target.value);
  };
  const priceInputHandler = (event) => {
    setPriceInput(event.target.value);
  };
  const shortdescInputHandler = (event) => {
    setShortdescInput(event.target.value);
  };
  const longdescInputHandler = (event) => {
    setLongdescInput(event.target.value);
  };
  const picturesInputHandler = (event) => {
    console.log(event.target.files[0]);
    setListPicture(event.target.files[0]);
  };
  const getDataProd = async () => {
    if (mode === "add") {
      return;
    } else if (mode === "update") {
      const response = await fetch(
        `http://localhost:5000/product/formupdate/${searchParms.get("id")}`
      );
      const data = await response.json();
      setNameInput(data.name);
      setCategoryInput(data.category);
      setPriceInput(data.price);
      setShortdescInput(data.short_desc);
      setLongdescInput(data.long_desc);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const dataText = {
      name: nameInput,
      category: categoryInput,
      price: priceInput,
      shortDesc: shortdescInput,
      longDesc: longdescInput,
    };
    const pictureFiles = listPicture;
    if (mode === "add") {
      const formData = new FormData();
      formData.append("dataText", JSON.stringify(dataText));
      formData.append("pictures", pictureFiles);
      const response = await fetch(`http://localhost:5000/product/create`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        navigate("/products");
      }
    } else if (mode === "update") {
      const response = await fetch(
        `http://localhost:5000/product/formupdate/${searchParms.get("id")}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataText),
        }
      );
      if (response.ok) {
        navigate("/products");
      }
    }
  };
  useEffect(() => {
    getDataProd();
  }, []);
  return (
    <div className={styles.container}>
      <Form className={styles.prodForm} onSubmit={submitHandler} method="POST">
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter Product Name"
          className={styles.nameInput}
          value={nameInput}
          onChange={nameInputHandler}
        />
        <label htmlFor="category">Category</label>
        <input
          id="category"
          type="text"
          placeholder="Enter Category"
          className={styles.categoryInput}
          value={categoryInput}
          onChange={categoryInputHandler}
        />{" "}
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="text"
          placeholder="Enter Price"
          className={styles.priceInput}
          value={priceInput}
          onChange={priceInputHandler}
        />
        <label htmlFor="short_desc">Short Description</label>
        <textarea
          id="short_desc"
          placeholder="Enter Short Description"
          className={styles.shortdesc}
          value={shortdescInput}
          rows={3}
          onChange={shortdescInputHandler}
        />
        <label htmlFor="long_desc">Long description</label>
        <textarea
          id="long_desc"
          placeholder="Enter Long Description"
          className={styles.longdesc}
          rows={6}
          value={longdescInput}
          onChange={longdescInputHandler}
        />
        {mode === "add" && (
          <>
            <label htmlFor="images">Upload images (5 images)</label>
            <input
              id="images"
              type="file"
              className={styles.fileInput}
              multiple
              onChange={picturesInputHandler}
            />
          </>
        )}
        <button className={styles.submitBtn}>Submit</button>
      </Form>
    </div>
  );
};
export default ProductForm;
