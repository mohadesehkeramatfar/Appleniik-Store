import Layout from "./component/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Products from "./component/Products";
import RegisterPage from "./Page/RegisterPage";
import LoginPage from "./Page/LoginPage";
import HomePage from "./Page/HomePage";
import ProductProvider from "./component/Context/GurdProductProvider";
import DetailProduct from "./Page/DetailProduct";
import CartProvider from "./component/Context/CartProvider";
import Cart from "./Page/Cart";
import AuthUserProvider from "./component/Context/AuthUserProvider";
import CheckOut from "./Page/CheckOut";
import ContactUs from "./Page/ContactUs";
import AboutUs from "./Page/AboutUs";
import FavoritesProvider from "./component/Context/FavoritesProvider";
import FavoritesList from "./Page/FavoritesList";
import { ToastProvider } from "react-toast-notifications";
import NotFound from "./Page/NotFound";
import Profile from "./Page/profile";
import SearchBox from "./component/SearchSort/Search";
import SearchResult from "./Page/SearchResult";
import CompareProduct from "./Page/CompareProduct";
import CloseBoxProvider, {
  useCloseBox,
  useCloseBoxActions,
} from "./component/Context/CloseBoxProvider";

const App = () => {
  return (
    <div className="bg-slate-50 container xl:max-w-screen h-full  text-sky-900">
      <BrowserRouter>
        <ProductProvider>
          <ToastProvider>
            <CartProvider>
              <AuthUserProvider>
                <FavoritesProvider>
                  <CloseBoxProvider>
                    <Layout />
                    {/* <SearchBox /> */}
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/CheckOut" element={<CheckOut />} />
                      <Route path="/product" element={<Products />} />
                      <Route path="/:id/*" element={<DetailProduct />} />
                      <Route path="/Register" element={<RegisterPage />} />
                      <Route path="/Login" element={<LoginPage />} />
                      <Route path="/Profile" element={<Profile />} />
                      <Route path="/Cart" element={<Cart />} />
                      <Route path="/ContactUs" element={<ContactUs />} />
                      <Route path="/AboutUs" element={<AboutUs />} />
                      <Route
                        path="/FavoritesList"
                        element={<FavoritesList />}
                      />
                      <Route path="/SearchResult" element={<SearchResult />} />
                      <Route
                        path="/CompareProduct"
                        element={<CompareProduct />}
                      />
                    </Routes>
                  </CloseBoxProvider>
                </FavoritesProvider>
              </AuthUserProvider>
            </CartProvider>
          </ToastProvider>
        </ProductProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
