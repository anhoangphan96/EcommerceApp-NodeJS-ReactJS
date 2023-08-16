import { useState } from "react";
import styles from "./ProductForm.module.css";
import { Form } from "react-router-dom";

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
    setListPicture(event.target.files);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const dataText = {
      name: nameInput,
      category: categoryInput,
      shortDesc: shortdescInput,
      longDesc: longdescInput,
    };
    const pictureFiles = listPicture;
    const formData = new FormData();
    formData.append("dataText", dataText);
    formData.append("pictures", pictureFiles);
    const response = await fetch(`http://localhost:5000/product/create`, {
      method: "POST",

      body: formData,
    });
  };

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
          onChange={picturesInputHandler}
        />
        <button className={styles.submitBtn}>Submit</button>
      </Form>
    </div>
  );
};
export default ProductForm;
