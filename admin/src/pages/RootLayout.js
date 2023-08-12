import SideBar from "../components/sidebar/SideBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <SideBar></SideBar>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
