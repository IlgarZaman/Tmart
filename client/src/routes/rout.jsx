import AdminRoot from "../components/admin/main-root/root";
import SiteRoot from "../components/site/main-root/root";
import DashBoard from "../layouts/admin/dashboard";
import Account from "../pages/site/account-page";
import AllProducts from "../pages/site/all-product";
import BasketPage from "../pages/site/basket-page";
import DetailPage from "../pages/site/detailPage";
import Home from "../pages/site/home-page/home";
import LoginRegister from "../pages/site/login-register-page";
import Notfound from "../pages/site/NotFound/notfound-page";
import Wishlist from "../pages/site/wishlist-page";

const Routes = [
  {
    path: "/",
    element: <SiteRoot />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login-register",
        element: <LoginRegister />,
      },
      {
        path: "*",
        element: <Notfound />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "meBasket",
        element: <BasketPage />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "detail/:id",
        element: <DetailPage />,
      },
    ],
  },
  {
    path: "/admin/",
    element: <AdminRoot />,
    children: [
      {
        path: "dashboard",
        element: <DashBoard />,
      },
    ],
  },
];

export default Routes;
