import React from "react";
import { useParams, useRouteLoaderData, Link } from "react-router-dom";
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

  //biến chứa id của Product lấy từ params
  const idProduct = params.id;

  // set biến email của current user nếu có thì lấy email không thì trả là string rỗng
  const curUserEmail = useSelector((state) => {
    if (state.login.isLogin) {
      return state.login.curUser[0].email;
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
  const dataProducts = useRouteLoaderData("mainpage");
  const productDetail = dataProducts.filter(
    (arr) => arr._id.$oid === idProduct
  )[0];
  const relatedProduct = dataProducts.filter(
    (arr) =>
      arr._id.$oid !== idProduct && arr.category === productDetail.category
  );

  //sử dụng custom hook useFormatPrice để format price đúng định dạng lưu vào biến price
  const price = useFormatPrice(productDetail.price);

  //Sét biến trạng thái hiển thị message khi người dùng thêm vào giỏ hàng thành công
  const [displayMessage, setDisplayMessage] = useState(false);

  //Biến quản lý việc thêm mới hay là update Cart, nếu là true thì loại hàng đã có trong giỏ h thêm số luộng, false là thêm mới
  const [isUpdateCart, setIsUpdateCart] = useState(
    listCart.findIndex(
      (cart) => cart.id === idProduct && cart.email === curUserEmail
    ) !== -1
  );
  useEffect(() => {
    setIsUpdateCart(
      listCart.findIndex(
        (cart) => cart.id === idProduct && cart.email === curUserEmail
      ) !== -1
    );
  }, [idProduct]);
  //Biến curImage để xác định ảnh nào đang được lựa chọn để phóng to cho người dùng dễ xem
  const [curImage, setCurImage] = useState(productDetail.img1);
  useEffect(() => setCurImage(productDetail.img1), [idProduct]);
  const selectPictureHanlder = (event) => {
    if (event.target.src) {
      setCurImage(event.target.src);
    }
  };

  //Function set số lượng sản phẩm khi người dùng input số lượng, tăng giảm số lượng bằng nút tăng hoặc giảm, không cho bé hơn 1 và rổng
  const quantityHandler = (event) => {
    setQuantity(event.target.value);
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

  //Dispatch action add sản phẩm vào giỏ hàng, truyển payload data chứa thông tin liên quan đến sản phẩm: id, name, price, quantity, image
  const addToCartHandler = () => {
    setIsUpdateCart(true);
    setDisplayMessage(true);
    dispatch(
      cartActions.ADD_CART({
        email: curUserEmail,
        id: idProduct,
        name: productDetail.name,
        price: productDetail.price,
        quantity: quantity,
        image: productDetail.img1,
      })
    );
    //Update giá tổng
    dispatch(cartActions.UPDATE_TOTALPRICE(curUserEmail));
    //Push vào array listCart để lưu vào local storage
    listCart.push({
      email: curUserEmail,
      id: idProduct,
      name: productDetail.name,
      price: productDetail.price,
      quantity: quantity,
      image: productDetail.img1,
    });
    localStorage.setItem("listCart", JSON.stringify(listCart));

    setTimeout(() => {
      setDisplayMessage(false);
    }, 1000);
  };

  //Biến lưu index của sản phẩm
  const index = listCart.findIndex(
    (cart) => cart.id === idProduct && cart.email === curUserEmail
  );

  //Function update số lượng trong giỏ hàng nếu sản phẩm này đã được thêm vào giỏ hàng trước đó
  const updateCartHandler = () => {
    setDisplayMessage(true);
    const newListCart = [...listCart];
    newListCart[index] = {
      ...newListCart[index],
      quantity: newListCart[index].quantity + quantity,
    };
    //dispatch action Update Cart
    dispatch(
      cartActions.UPDATE_CART({
        id: idProduct,
        quantity: newListCart[index].quantity,
      })
    );
    dispatch(cartActions.UPDATE_TOTALPRICE(curUserEmail));
    //Lưu thông tin listCart được update vào local storage
    localStorage.setItem("listCart", JSON.stringify(newListCart));
    // Ẩn message thêm thành công sau 1s
    setTimeout(() => {
      setDisplayMessage(false);
    }, 1000);
  };
  //Trả về các phần tử JSX cần thiết để render detailpage: list hình ảnh, hình ảnh phóng to, thông tin detail, description, related product
  return (
    <div className={styles.container}>
      <div className={styles.displayProduct}>
        <div className={styles.productImages} onClick={selectPictureHanlder}>
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
                ></input>
                <i
                  className="fa-solid fa-caret-right"
                  onClick={increaseQuant}
                ></i>
              </div>
            </div>
            <button
              onClick={isUpdateCart ? updateCartHandler : addToCartHandler}
            >
              Add to cart
            </button>
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
              to={`/detail/${product._id.$oid}`}
              key={product._id.$oid + idProduct}
            >
              <Item product={product}></Item>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DetailPage;
