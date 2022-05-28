import {
  useCopyProduct,
  useCopyProductActions,
  useProduct,
  useProductActions,
} from "../Context/GurdProductProvider";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SearchBox = () => {
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
   
    <section className=" flex items-center relative  rounded  z-20  w-full  sm:w-3/4  ">
        <section
          className=" bg-pink-600 px-2 py-1 rounded cursor-pointer "
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
  )
};

export default SearchBox;






// <section className="  ">
// {/* section for md size */}
// <section className=" hidden md:flex md:justify-center  ">
//   {boxSearch && (
//     <input
//       type="text"
//       value={textSearch}
//       placeholder="جستجو"
//       onKeyDown={(e) => searchHandler(e)}
//       onChange={(e) => searchChange(e)}
//       className=" text-sky-900 border-b-2 border-sky-900 border-opacity-80 px-4 py-1 outline-none"
//     />
//   )}
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-7 w-7 rotate-90  "
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth="2"
//     onClick={() => showBoxSearchHandler()}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//     />
//   </svg>
// </section>
// </section>

// {/* Section For mobile size */}
// <section className=" flex px-2 items-center justify-center  md:hidden ">
// {boxSearch && (
//   <input
//     type="text"
//     value={textSearch}
//     placeholder="جستجو"
//     onKeyDown={(e) => searchHandler(e)}
//     onChange={(e) => searchChange(e)}
//     className="text-sky-900  z-10 top-1 absolute left-8 border-b-2  border-sky-900 w-60  px-4 py-1 outline-none  transition-all  ease-in-out duration-500 "
//   />
// )}
// <section className="">
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-7 w-7 rotate-90 absolute left-0 top-0   text-sky-900 "
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth="2"
//     onClick={() => showBoxSearchHandler()}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//     />
//   </svg>
// </section>
// </section>