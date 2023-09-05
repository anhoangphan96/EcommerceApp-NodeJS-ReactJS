import Banner from "../Components/Banner";
import ItemTypeList from "../Components/ItemTypeList";
import ItemList from "../Components/ItemList";
import { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import SubscribeFrom from "../Components/SubscribeForm";

const HomePage = function () {
  //lấy data từ route loader
  const data = useRouteLoaderData("mainpage");
  const [dataProduct, setDataProduct] = useState([]);
  //Function lấy 9 sản phẩm đầu tiên từ data fetch được
  const getDataProduct = function () {
    setDataProduct(data.slice(0, 8));
  };
  //Sử dụng useEffect chạy hàm getDataProduct khi vào page lần đầu
  useEffect(() => {
    getDataProduct();
  }, []);
  // component trả về JSX được tạo thành từ các component con từng component sẽ được giải thích trong file của nó
  return (
    <>
      <Banner></Banner>
      <ItemTypeList></ItemTypeList>
      <ItemList dataProduct={dataProduct}></ItemList>
      <SubscribeFrom></SubscribeFrom>
    </>
  );
};
export default HomePage;
// xây dựng phần data cho loader để lấy data từ link api được đề bài cung cấp, sẽ được sử dụng trong nhiều route khác nhau
export async function loader() {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/product/getall`
  );
  return response;
}
