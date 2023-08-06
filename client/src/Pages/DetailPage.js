import React from "react";
import {
  useParams,
  useRouteLoaderData,
  Link,
  useSearchParams,
  useNavigation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/store";
import styles from "./DetailPage.module.css";
import Item from "../Components/Item";
import { useFormatPrice } from "../Components/customHooks/useFormatPrice";
const DetailPage = function () {
  // Khai báo biến từ các hook để sử dụng,
  const params = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  //biến chứa id của Product lấy từ params
  const idProduct = params.id;
  const category = searchParams.get("category");
  const [productDetail, setProductDetail] = useState({
    name: "",
    price: 0,
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    category: "",
    long_desc: "",
  });
  const [relatedProduct, setRelatedProduct] = useState([]);
  //Biến curImage để xác định ảnh nào đang được lựa chọn" để phóng to cho người dùng dễ xem
  const [curImage, setCurImage] = useState("");
  // set biến email của current user nếu có thì lấy email không thì trả là string rỗng
  const curUserEmail = useSelector((state) => {
    if (state.login.isLogin) {
      return state.login.curUser.email;
    } else {
      return "";
    }
  });

  //Biến chứa số lượng do user lựa chọn
  const [quantity, setQuantity] = useState(1);
  //Biến chứa list sản phẩm có trong cart hiện tại, localstorage và redux store đồng bộ
  const listCart = JSON.parse(localStorage.getItem("listCart")) ?? [];
  //Biến list product lấy từ local storage, sau đó sẽ đem filter ra 2 array 1 chứa product đang được display thông tin
  //và 1 array chứ list các sản phẩm gợi ý liên quan đến sản phẩm chính
  const getProdDetail = async () => {
    const response = await fetch(
      `http://localhost:5000/product/detail/${idProduct}`
    );
    const data = await response.json();
    console.log(data);
    setProductDetail(data);
    setCurImage(data.img1);
  };
  const getRelatedProds = async () => {
    setIsLoading((prev) => true);
    const response = await fetch(
      `http://localhost:5000/product/relate?id=${idProduct}&category=${category}`
    );
    const data = await response.json();
    setRelatedProduct(data);
    setIsLoading((prev) => false);
  };
  useEffect(() => {
    getProdDetail();
    getRelatedProds();
  }, [idProduct]);

  //sử dụng custom hook useFormatPrice để format price đúng định dạng lưu vào biến price
  const price = useFormatPrice(productDetail.price);

  //Sét biến trạng thái hiển thị message khi người dùng thêm vào giỏ hàng thành công
  const [displayMessage, setDisplayMessage] = useState(false);

  useEffect(() => setCurImage(productDetail.img1), [idProduct]);
  const selectPictureHanlder = (event) => {
    if (event.target.src) {
      setCurImage(event.target.src);
    }
  };

  //Function set số lượng sản phẩm khi người dùng input số lượng, tăng giảm số lượng bằng nút tăng hoặc giảm, không cho bé hơn 1 và rổng
  const quantityHandler = (event) => {
    if (event.target.value < 1) {
      console.log("asd");
      setQuantity(1);
    } else {
      setQuantity(event.target.value);
    }
  };
  const decreaseQuant = () => {
    setQuantity((prev) => {
      if (prev === 1 || prev === "") {
        return 1;
      }
      return prev - 1;
    });
  };

  const increaseQuant = () => {
    setQuantity((prev) => {
      if (prev === "") {
        return 1;
      }
      return prev + 1;
    });
  };

  //Function truyền data xuống backend để tiến hành thêm sản phẩm vào giỏ hàng
  const addToCartHandler = () => {
    setDisplayMessage(true);
    const postAddCart = async () => {
      const response = await fetch(`http://localhost:5000/user/addcart`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: idProduct,
          quantity: quantity,
        }),
      });
    };
    postAddCart();
    setTimeout(() => {
      setDisplayMessage(false);
    }, 1000);
  };
  console.log(isLoading);
  //Trả về các phần tử JSX cần thiết để render detailpage: list hình ảnh, hình ảnh phóng to, thông tin detail, description, related product
  return (
    <div className={styles.container}>
      {isLoading ? (
        <p>...Loading</p>
      ) : (
        <>
          <div className={styles.displayProduct}>
            <div
              className={styles.productImages}
              onClick={selectPictureHanlder}
            >
              <img src={productDetail.img1}></img>
              <img src={productDetail.img2}></img>
              <img src={productDetail.img3}></img>
              <img src={productDetail.img4}></img>
            </div>
            <img src={curImage} className={styles.pictureZoomOut}></img>
            <div className={styles.productDetail}>
              <h3>{productDetail.name}</h3>
              <h4>{price} VND</h4>
              <p>{productDetail.short_desc}</p>
              <h5>
                CATEGORY: <span> {productDetail.category}</span>
              </h5>
              <div className={styles.addToCart}>
                <div className={styles.quantity}>
                  <span>QUANTITY</span>
                  <div className={styles.chooseQuantity}>
                    <i
                      className="fa-solid fa-caret-left"
                      onClick={decreaseQuant}
                    ></i>
                    <input
                      type="number"
                      value={quantity}
                      onChange={quantityHandler}
                      min={1}
                      max={9999}
                    ></input>
                    <i
                      className="fa-solid fa-caret-right"
                      onClick={increaseQuant}
                    ></i>
                  </div>
                </div>
                <button onClick={addToCartHandler}>Add to cart</button>
              </div>
              {displayMessage && (
                <p className={styles.alertMessage}>
                  Your product is added to cart successfully!
                </p>
              )}
            </div>
          </div>
          <div className={styles.description}>
            <button disabled={true}>DESCRIPTION</button>
            <h3>PRODUCT DESCRIPTION</h3>
            <>
              {productDetail.long_desc.split("\n").map((des, i) => (
                <p key={i}>{des}</p>
              ))}
            </>
          </div>
          <div className={styles.relatedProduct}>
            <h3>RELATED PRODUCTS</h3>
            <div className={styles.relatedList}>
              {relatedProduct.map((product) => (
                <Link
                  to={`/detail/${product._id}?category=${product.category}`}
                  key={product._id + idProduct}
                >
                  <Item product={product}></Item>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default DetailPage;
