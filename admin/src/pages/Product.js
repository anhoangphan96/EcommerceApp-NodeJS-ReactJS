import { useEffect, useState } from "react";
import ProductItem from "../components/Product/ProductItem";
import styles from "./Product.module.css";
import { useNavigate } from "react-router-dom";
const Product = () => {
  const navigate = useNavigate();
  const [listProducts, setListProducts] = useState([]);
  const [listProdFilter, setListProdFilter] = useState(listProducts);
  const getListProducts = async () => {
    const response = await fetch(`http://localhost:5000/product/getall`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      setListProducts(data);
      setListProdFilter(data);
    } else if (response.status === 500) {
      navigate("/servererror");
    }
  };
  useEffect(() => {
    getListProducts();
  }, []);
  const addProdNavigate = () => {
    navigate("/products/form?mode=add");
  };
  const searchKeywordHandler = (event) => {
    if (event.target.value.trim() !== "") {
      setListProdFilter(
        listProducts.filter((product) => {
          return product.name
            .toLowerCase()
            .replaceAll(" ", "")
            .includes(event.target.value.toLowerCase().replaceAll(" ", ""));
        })
      );
    } else {
      setListProdFilter(listProducts);
    }
  };
  return (
    <div className={styles.prodPageContainer}>
      <h2>
        Products{" "}
        <button className={styles.btnAdd} onClick={addProdNavigate}>
          Add New
        </button>
      </h2>
      <input
        type="text"
        placeholder="Enter Search!"
        onChange={searchKeywordHandler}
      />
      <table className={styles.prodTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Category</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {listProdFilter.length > 0 &&
            listProdFilter.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                getListProducts={getListProducts}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Product;
