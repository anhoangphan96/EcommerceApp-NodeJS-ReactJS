import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage, { loader as productLoader } from "./Pages/HomePage";
import ShopPage from "./Pages/ShopPage";
import DetailPage from "./Pages/DetailPage";
import CartPage from "./Pages/CartPage";
import CheckOutPage from "./Pages/CheckOutPage";
import LoginPage, { action as UserAcess } from "./Pages/LoginPage";
import RootLayout from "./Pages/RootLayout";
import store from "./redux/store";
function App() {
  //Tạo ra biến router để quản lý router cho các thành phần con bên trong
  const router = createBrowserRouter([
    {
      //Root router
      path: "/",
      element: <RootLayout></RootLayout>,
      id: "mainpage",
      loader: productLoader,
      children: [
        {
          //Trang Home có cùng path với root khi dùng index:true
          index: true,
          element: <HomePage></HomePage>,
        },
        {
          //Trang Shopage
          path: "/shop",
          element: <ShopPage></ShopPage>,
        },
        //Trang DetailPage hiển thị động theo id sản phẩm
        { path: "/detail/:id", element: <DetailPage></DetailPage> },
        //Trang cart lưu danh sách sản phẩm được thêm vào giỏ hàng
        { path: "/cart", element: <CartPage></CartPage> },
        // Trang checkout điền thông tin đặt hàng
        { path: "/checkout", element: <CheckOutPage></CheckOutPage> },
        //Trang login page và accesspage tích hợp vào cùng 1 trang với action UserAccess để validate hành động đăng nhập hoặc đăng ký
        { path: "/login", element: <LoginPage></LoginPage>, action: UserAcess },
      ],
    },
  ]);
  //Functiont trả ra JSX chứa Provider để truy cập vào store của Redux và các router
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
