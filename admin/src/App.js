import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import DashBoard from "./pages/DashBoard";
import Product from "./pages/Product";
import OrderHistory from "./pages/OrderHistory";
import ProductForm from "./pages/ProductForm";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <DashBoard />,
        },
        {
          path: "/products",
          element: <Product />,
        },
        {
          path: "/products/form",
          element: <ProductForm />,
        },
        { path: "/history", element: <OrderHistory></OrderHistory> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
