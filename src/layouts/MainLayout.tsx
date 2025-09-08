import Header from "../components/Header.tsx";
import { Outlet } from "react-router";

function MainLayout() {
  return (
    <>
      <Header />
      <div className="my-4"></div>
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
