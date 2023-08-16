import { useState } from "react";
import styles from "./ProductForm.module.css";

const ProductForm = () => {
  const [nameInput, setNameInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [shortdescInput, setShortdescInput] = useState("");
  const [longdescInput, setLongdescInput] = useState("");
  const [listPicture, setListPicture] = useState("");
  const nameInputHandler = (event) => {
    setNameInput(event.target.value);
  };
  const categoryInputHandler = (event) => {
    setCategoryInput(event.target.value);
  };
  const shortdescInputHandler = (event) => {
    setShortdescInput(event.target.value);
  };
  const longdescInputHandler = (event) => {
    setLongdescInput(event.target.value);
  };
  const picturesInputHandler = (event) => {
    console.log(event.target.files);
    setListPicture(event.target.value);
  };
  const submitHandler = async () => {
    const response = await fetch(`http://localhost:5000/product/create`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: nameInput,
        category: categoryInput,
        shortDesc: shortdescInput,
        longDesc: longdescInput,
      }),
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.prodForm} onSubmit={submitHandler}>
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
        <label htmlFor="images">Upload images (5 images)</label>
        <input
          id="images"
          type="file"
          className={styles.fileInput}
          multiple
          value={listPicture}
          onChange={picturesInputHandler}
        />
        <button className={styles.submitBtn}>Submit</button>
      </form>
    </div>
  );
};
export default ProductForm;
