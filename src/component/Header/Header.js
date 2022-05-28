import { useEffect, useState } from "react";
import arrow from "../../assets/image/b.png";
import { motion } from "framer-motion";
import useCollapse from "react-collapsed";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useCart, useCartActions } from "../Context/CartProvider";
import {
  useFavorites,
  useFavoritesActions,
} from "../Context/FavoritesProvider";
import { useAuthUser, useAuthUserActions } from "../Context/AuthUserProvider";

const Header = () => {
  const [openHeader, setOpenHeader] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const authUser = useAuthUser();
  const { getCollapseProps, getToggleProps } = useCollapse({ openHeader });
  const { cartList, totalCount } = useCart();
  const { favoriteList, count } = useFavorites();
  const setCart = useCartActions();
  const setFavorite = useFavoritesActions();
  const setAuth = useAuthUserActions();
  const dispatchAuthUser = useAuthUserActions();
  const navigate = useNavigate();

  useEffect(() => {
    setCart({ type: "LocalStorage" });
    setFavorite({ type: "GetFromLS" });
    const lSAuthUser = JSON.parse(localStorage.getItem("AuthUser"));
    setAuth(lSAuthUser);
  }, []);

  const signOutHandler = () => {
    localStorage.removeItem("AuthUser");
    dispatchAuthUser(false);
    navigate("/");
  };

  const openHeaderHandler = () => {
    setOpenHeader(!openHeader);
    setOpenUser(false);
  };

  return (
    <div className=" fixed top-0 right-0 left-0  z-50">
      <section className="bg-sky-900 h-16 text-white ">
        {/* FOR SIZE Mobile */}
        <section className=" flex flex-col  container xl:max-w-screen-xl">
          {/* logo */}
          <section>
            <h1 className=" md:hidden mt-1  font-bold bg-gradient-to-b from-white to-gray-400  bg-clip-text text-transparent  ">
              Appleniik
            </h1>
          </section>

          {/* humberger / icon user-favorite-cart */}
          <section className="md:hidden flex items-center justify-between ">
            {/* Humberger Menu */}
            <NavBar />

            {/* left section Header */}
            <section className=" flex items-center justify-between  ">
              {/* USER */}
              <svg
                onClick={() => setOpenUser(!openUser)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>

              <section
                onClick={() => setOpenUser(false)}
                className={
                  openUser
                    ? " font-bold flex flex-col  bg-sky-900 rounded-b absolute top-16 left-24 py-2"
                    : " hidden"
                }
              >
                {/* REGISTER OR SIGNOUT */}
                <section className=" text-center">
                  {authUser ? (
                    <button
                      onClick={signOutHandler}
                      className=" cursor-pointer px-3   hover:bg-white hover:text-sky-900 rounded-md"
                    >
                      خروج
                    </button>
                  ) : (
                    <section className="text-center">
                      <Link
                        to="Register"
                        className=" cursor-pointer px-4   hover:bg-white hover:text-sky-900 rounded-md
                       "
                      >
                        ثبت نام
                      </Link>
                    </section>
                  )}
                </section>
                {/* LOGIN OR INFO */}
                <section className=" text-center mt-2 cursor-pointer">
                  {authUser ? (
                    <Link
                      to="Profile"
                      className=" whitespace-nowrap cursor-pointer px-6   hover:bg-white hover:text-sky-900 rounded-md "
                    >
                      {authUser.name}
                    </Link>
                  ) : (
                    <Link
                      to="Login"
                      className="cursor-pointer px-6     hover:bg-white hover:text-sky-900 rounded-md "
                    >
                      ورود
                    </Link>
                  )}
                </section>
              </section>

              {/* Favorites */}
              <section className=" relative mr-4">
                <Link to="FavoritesList" className=" flex items-center ">
                  <span className="rounded-full px-1 absolute -top-1  font-thin bg-pink-600 text-xs self-start bg-opacity-80 ">
                    {count}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </Link>
              </section>

              {/* Cart */}
              <section className=" relative  mr-6 ">
                <Link
                  to="Cart"
                  className=" flex items-center justify-start text-sm cursor-pointer "
                >
                  <span
                    className="rounded-full px-1 absolute -top-1 left-3 font-thin bg-pink-600 
                    text-xs self-start bg-opacity-80 "
                  >
                    {cartList.length}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg cursor-pointer"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </Link>
              </section>
            </section>
          </section>
        </section>

        {/*Screen   */}
        <section className=" hidden md:flex items-center justify-around my-3  w-full">
          {/* Logo */}
          <section className="flex justify-start text-xl ">
            <h1 className=" mt-1  font-bold bg-gradient-to-b from-white to-gray-400  bg-clip-text text-transparent  ">
              Appleniik
            </h1>
          </section>
          <NavBar />

          {/* LEFT SECTION HEADER */}
          <section className=" relative  flex justify-between  items-center">
            {/* REGISTER OR LOGIN */}
            <section className=" text-sm flex text-white flex-col justify-start  items-base sm:flex-row sm:justify-between ">
              {authUser ? (
                <button
                  onClick={signOutHandler}
                  className="hidden md:block ml-3  cursor-pointer"
                >
                  خروج
                </button>
              ) : (
                <Link
                  to="Register"
                  className="hidden md:block border-l pl-2 cursor-pointer "
                >
                  ثبت نام
                </Link>
              )}

              <section
                to="Login"
                className="hidden md:block px-2 cursor-pointer text-white "
              >
                {authUser ? (
                  <Link to="Profile">{authUser.name} </Link>
                ) : (
                  <Link to="Login">ورود</Link>
                )}
              </section>
            </section>

            {/* Favorites */}
            <Link to="FavoritesList" className=" text-white flex items-center">
              <span className="rounded-full px-1 font-thin text-xs  bg-pink-600 absolute -top-1 left-12 bg-opacity-70 ">
                {/* {favoriteList.length == 0 ? <p>0</p> : <p> {count}</p>} */}
                {count}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              {/* <h1 className="hidden lg:block">علاقه مندی ها</h1> */}
            </Link>

            {/* CART */}
            <Link
              to="Cart"
              className=" flex items-center  text-sm cursor-pointer"
            >
              <span className="rounded-full px-1 font-thin text-xs text-white  bg-pink-600 absolute -top-1 left-2 bg-opacity-70 ">
                {cartList.length}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg cursor-pointer"
                className="h-6 w-6 text-white mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Header;
