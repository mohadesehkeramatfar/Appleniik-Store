import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import queryString from "query-string";
import {
  useCopyProduct,
  useCopyProductActions,
  useProduct,
} from "../component/Context/GurdProductProvider";
import sadImage from "./../assets/image/sad.gif";
import loading from "../assets/image/0 mv8MNRLDNNnt5f72.gif";
import SearchBox from "../component/SearchSort/Search";
import { useState } from "react";
import {
  useCloseBox,
  useCloseBoxActions,
} from "../component/Context/CloseBoxProvider";
const SearchResult = () => {
  const location = useLocation();
  const parse = queryString.parse(location.search);
  const valueSearch = parse.name;
  const copyProduct = useCopyProduct();
  const setCopyProduct = useCopyProductActions();
  const [flagSearchResult, setFlagSearchResult] = useState(false);
  const { userMenu } = useCloseBox();
  const setIsCloseBoxUser = useCloseBoxActions();

  const closeUserBoxHandler = () => {
    setIsCloseBoxUser({ type: "ColseUserBox" });
  };
  useEffect(() => {
    if (valueSearch === "") {
      setFlagSearchResult(true);
    } else {
      const searchResult = copyProduct.filter((itm) => {
        return Object.values(itm).join(" ").includes(valueSearch);
      });
      if (searchResult.length === 0) {
        setFlagSearchResult(true);
      } else {
        setFlagSearchResult(false);
        setCopyProduct(searchResult);
      }
    }
  }, [valueSearch]);

  return (
    <div className="container xl:max-w-screen absolute top-24 left-0 right-0">
      <section className=" relative">
        <section className=" ">
          <SearchBox />
        </section>
        {/* If Result Search is True */}
        {!flagSearchResult ? (
          <div className=" relative">
            <div
              className="    grid gap-3  gap-y-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
    lg:grid-cols-4 absolute top-20 left-0 right-0 "
            >
              {!copyProduct ? (
                <section className="  w-screen container xl:max-w-screen-xl h-screen absolute left-0 right-0">
                  <img src={loading} className="rounded w-full h-3/4" />
                  <p className=" z-10 text-center absolute w-full top-20 font-extrabold  text-4xl animate-bounce">
                    ...Loading
                  </p>
                </section>
              ) : (
                copyProduct.map((itm) => {
                  return (
                    <section
                      key={itm._id}
                      className="flex flex-col relative  items-center  overflow-hidden cursor-pointer hover:scale-110 
                      transition-all delay-200 "
                    >
                      {/* image Section  */}
                      <Link to={`/${itm._id}`}>
                        <img
                          className="rounded w-56 h-48"
                          src={itm.image}
                        />
                      </Link>

                      {/* Description Section */}
                      <Link
                        to={`/${itm._id}`}
                        className=" text-sky-900 w-full py-1 text-sm"
                      >
                        <h1 className="text-center">
                          {itm.type} {itm.brand} {itm.title}
                        </h1>
                        <h1 className="text-center font-bold mt-1 text-xl">
                          {itm.price
                            .toFixed(0)
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}

                          <span className="font-normal text-sm"> تومان </span>
                        </h1>
                      </Link>
                    </section>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          // if Result Search is FALSE
          <section className=" absolute top-48 right-0 left-0 flex flex-col">
            <section className="  border-b-2 mx-auto flex items-center text-center border-b-pink-600  ">
              <h1 className="     px-10   text-pink-600 font-extrabold text-2 xl  ">
                متاسفانه هیچ محصولی به اسم <span>"{valueSearch}"</span> پیدا نشد
                !!!
              </h1>
              <img src={sadImage} className="w-24 h-24 " />
            </section>

            <Link to="/product" className="text-center pt-5 pb-5   ">
              برای دیدن محصولات این قسمت را کلیک کنید
            </Link>
          </section>
        )}
      </section>
    </div>
  );
};

export default SearchResult;
