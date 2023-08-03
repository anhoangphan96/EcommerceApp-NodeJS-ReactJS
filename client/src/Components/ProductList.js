import React from "react";
import Item from "./Item";
import styles from "./ProductList.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ProductList = (props) => {
  // import category từ Redux store
  const category = useSelector((state) => state.category.category);
  // Component trả ra JSX để hiển thị danh sách các sản phẩm được filter từ props.productList từ shopage truyền xuống, và các thành phần phụ khác
  return (
    <div className={styles.productListContainer}>
      <div className={styles.addtionalFilter}>
        <input placeholder="Enter Search Here!"></input>
        <select>
          <option>Default sorting</option>
        </select>
      </div>
      <div className={styles.productList}>
        {props.productList.map((product) => (
          <Link
            to={`/detail/${product._id.$oid}`}
            key={`${product._id.$oid}${category}`}
          >
            <Item product={product}></Item>
          </Link>
        ))}
      </div>
      <div className={styles.pagination}>
        <div className={styles.paginationButtons}>
          <button className={styles.navigate}>
            <i className="fa-solid fa-angles-left"></i>
          </button>
          {props.productList.length ? (
            <button className={styles.pageNumber}>
              {Math.ceil(props.productList.length / 9)}
            </button>
          ) : null}
          <button className={styles.navigate}>
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
        <p>{`Showing 1-9 of ${
          9 * Math.ceil(props.productList.length / 9)
        } results`}</p>
      </div>
    </div>
  );
};
export default ProductList;
