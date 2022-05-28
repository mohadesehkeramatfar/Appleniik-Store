import MainSlider from "../component/Home/MainSlider";
import Category from "../component/Home/Category";
import { useCart, useCartActions } from "../component/Context/CartProvider";
import { useEffect, useState } from "react";
import {
  useCopyProduct,
  useCopyProductActions,
  useProduct,
  useProductActions,
} from "../component/Context/GurdProductProvider";
import { useNavigate, Link } from "react-router-dom";

export const images = [
  "/product/1.JPG",
  "/product/2.JPG",
  "/product/3.JPG",
  "/product/4.JPG",
  "/product/6.JPG",
  "/product/7.JPG",
  "/product/8.JPG",
  "/product/9.JPG",
  "/product/10.JPG",
  "/product/11.JPG",
  "/product/12.JPG",
];

const HomePage = () => {
  const [boxSearch, setBoxSearch] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const products = useProduct();
  const copyProduct = useCopyProduct();
  const setCopyProduct = useCopyProductActions();
  const navigate = useNavigate();
  const [flagSearchResult, setFlagSearchResult] = useState(false);

  const searchChange = (e) => {
    setTextSearch(e.target.value);
  };
  const searchHandler = (e) => {
    if (textSearch === "" && e.key === "Enter") {
      setBoxSearch(!boxSearch);
    } else if (e.key === "Enter") {
      navigate({
        pathname: `/SearchResult`,
        search: `?name=${textSearch}`,
      });
      setBoxSearch(!boxSearch);

      if (textSearch !== "") {
        const searchResult = copyProduct.filter((itm) =>
          itm.title.includes(textSearch)
        );
        if (searchResult.length === 0) {
          setFlagSearchResult(true);
        } else {
          setFlagSearchResult(false);
          setCopyProduct(searchResult);
        }
      }
    }
  };

  const searchBtnHandler = () => {
    if (textSearch !== "") {
      const searchResult = copyProduct.filter((itm) =>
        itm.title.includes(textSearch)
      );
      if (searchResult.length === 0) {
        setFlagSearchResult(true);
      } else {
        setFlagSearchResult(false);
        setCopyProduct(searchResult);
      }
      navigate({
        pathname: `/SearchResult`,
        search: `?name=${textSearch}`,
      });
    }
  };
  return (
    <div className="  left-0 right-0 top-16 absolute ">
      <section className="">
        <MainSlider />
      </section>

      {/* Search Home */}
      <section className=" flex items-center relative  rounded  z-20 mx-auto  w-3/4 mt-[35%] ">
        <section
          className=" bg-pink-600 px-2 py-1 rounded "
          onClick={searchBtnHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6  text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </section>
        <input
          type=" text"
          value={textSearch}
          onKeyDown={(e) => searchHandler(e)}
          onChange={(e) => searchChange(e)}
          placeholder="جستجو ..."
          className=" px-2 py-1 z-10 w-full rounded outline-none border-gray-100 border-opacity-50 focus:border-gray-200 border-2 mr-3  "
        />
      </section>
      <Category />
    </div>
  );
};

export default HomePage;
