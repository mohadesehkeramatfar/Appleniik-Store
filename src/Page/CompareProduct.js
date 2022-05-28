import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  useCopyProduct,
  useProduct,
  useCopyProductActions,
} from "../component/Context/GurdProductProvider";
import SearchBox from "../component/SearchSort/Search";

const CompareProduct = () => {
  const { state } = useLocation();
  const firstProduct = state.detailProduct;
  const [products, setProducts] = useState([]);
  const [isopen, setIsOpen] = useState(false);
  const copyProduct = useCopyProduct();
  const product = useProduct();
  const setCopyProduct = useCopyProductActions();
  const [searchValue, setSearchValue] = useState("");
  const [flagWarning, setFlagWarnin] = useState(false);

  useEffect(() => {
    setProducts([
      {
        ...products,
        id: firstProduct._id,
        image: firstProduct.image,
        type: firstProduct.type,
        title: firstProduct.title,
        brand: firstProduct.brand,
        price: firstProduct.price,
        properties: firstProduct.properties,
      },
    ]);
  }, []);
  // Search Handler
  const searchOnChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };
  const searchHandler = (e) => {
    if (e.key === "Enter") {
      if (searchValue === "") {
        setCopyProduct(product);
      } else {
        const filterItem = copyProduct.filter((itm) =>
          itm.title.includes(searchValue)
        );
        if (filterItem.length === 0) {
          setFlagWarnin(true);
        } else {
          setCopyProduct(filterItem);
          setFlagWarnin(false);
        }
      }
    }
  };

  const closeHandler = () => {
    setIsOpen(false);
    setFlagWarnin(false);
    // setCopyProduct(product)
  };

  const addSecondProductHandler = () => {
    setIsOpen(true);
    setFlagWarnin(false);
    const filtered = copyProduct.filter((itm) => itm._id !== firstProduct._id);
    setCopyProduct(filtered);
    // setCopyProduct(product);
  };

  const showProducts = (itm) => {
    setIsOpen(false);
    products.push({
      ...products,
      id: itm._id,
      image: itm.image,
      brand: itm.brand,
      type: itm.type,
      title: itm.title,
      price: itm.price,
      properties: itm.properties,
    });
    console.log(products);
  };

  const deleteProduct = (itm) => {
    const filteredItem = products.filter((item) => item.id !== itm.id);
    setProducts(filteredItem);
  };

  return (
    <div className="absolute container  left-0 right-0 h-full top-24 ">
      <SearchBox/>
      <h1 className=" mt-5 border-b-2 font-extrabold text-2xl text-center pb-2 ">
        مقایسه محصول
      </h1>

      {/* Box Is Open For Add Product */}
      {isopen && (
        <section
          className=" transition-all duration-500 h-4/5 overflow-scroll bg-slate-50  z-10 
        absolute top-24 left-0 right-0  w-4/5 md:w-2/4 mx-auto rounded "
        > 
      
          <section className="">
            {/* Close Button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={closeHandler}
              className="h-8 absolute text-pink-600  left-0 px-4 font-extrabold text-2xl mt-2 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>

            {/* Search Box */}
            <section className=" absolute top-12 w-full px-2 md:px-10  ">
              <input
                type="text"
                onKeyDown={(e) => searchHandler(e)}
                onChange={(e) => searchOnChangeHandler(e)}
                placeholder=" جستجو"
                className=" w-full outline-none  border-sky-900 rounded py-2 px-4"
              />
            </section>

            {/* warning Section */}
            {flagWarning && (
              <p className=" absolute top-24 mt-2 left-0 right-0 text-center text-pink-600 font-bold ">
                متاسفانه محصولی پیدا نشد!!!
              </p>
            )}

            {/* Show Product Second */}
            <section className="   grid gap-2 grid-cols-2 md:grid-cols-3 left-0 right-0  absolute top-36 px-2 text-sm md:px-10">
              {copyProduct.map((itm) => {
                return (
                  <section
                    className=" text-center "
                    key={itm._id}
                    onClick={() => showProducts(itm)}
                  >
                    <img
                      src={itm.image}
                      className="h-24 w-full mx-auto rounded"
                    />
                    <h1>
                      {itm.type} {itm.brand} {itm.title}
                    </h1>
                    <h1>
                      {itm.price
                        .toFixed(0)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                      تومان
                    </h1>
                  </section>
                );
              })}
            </section>
          </section>
        </section>
      )}

      {/*SHOW PRODUCT ON  PAGE COMPARE */}
      <section
        className={`${
          isopen
            ? " mt-5 opacity-50 flex justify-evenly items-center "
            : " text-sm  flex gap-2 justify-evenly items-center mt-5 "
        }`}
      >
        {products.map((itm) => {
          return (
            <section className=" text-center" key={itm.id}>
              {
                <section>
                  {products.length >= 2 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => deleteProduct(itm)}
                      className="h-6 w-6 text-pink-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                  <Link to={`/${itm.id}`}>
                    {" "}
                    <img src={itm.image} className="h-32 w-48 rounded" />
                  </Link>
                  <h1 className=" pt-2">
                    {itm.type} {itm.brand} {itm.title}{" "}
                  </h1>

                  <h1 className=" pt-1">
                    {itm.price
                      .toFixed(0)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                    <span> تومان </span>
                  </h1>
                </section>
              }
            </section>
          );
        })}

        {/* IF PRODUCT.LENGTH === 1 */}
        <section className=" hover:scale-125 hover:transition-all  hover:duration-500">
          {products.length === 1 && (
            <section className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={addSecondProductHandler}
                className="h-10  w-full  text-pink-600  "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className=" font-bold  w-full text-center  ">
                انتخاب کالا
              </span>
            </section>
          )}
        </section>

        {/* IF PRODUCT.LENGTH === 2 */}
        <section
          className={`${
            products.length === 2 &&
            " hidden xl:block hover:scale-125 hover:transition-all  hover:duration-500 "
          }`}
        >
          {products.length === 2 && (
            <section className=" hidden xl:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={addSecondProductHandler}
                className="h-10  w-full  text-pink-600  "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <h1 className="font-bold  w-full text-center  ">انتخاب کالا</h1>
            </section>
          )}
        </section>
      </section>

      {/* <h1 className=" text-slate-400 py-1 ">مشخصات کالا</h1> */}

      <section className={`${isopen ? " opacity-50" : "opacity-100"}`}>
        {/* جنس کالا */}
        <h1 className=" text-slate-400 border-b-2 py-1 px-1 md:px-4">
          جنس کالا:
        </h1>
        <section className="grid  grid-cols-2 md:grid-cols-3 w-3/4 mx-auto  px-1 md:px-4 ">
          {products.map((itm) => {
            return (
              <section key={itm.id} className="  ">
                {itm.properties.map((item) => {
                  return (
                    <h1 key={item._id} className="py-1  px-1 text-sm">
                      {item.material}
                    </h1>
                  );
                })}
              </section>
            );
          })}
        </section>

        {/*  لوازم همراه */}
        <h1 className=" text-slate-400 border-b-2 py-1 px-4">لوازم همراه: </h1>
        <section className="  text-sm grid grid-cols-2 md:grid-cols-3 w-3/4 mx-auto  px-1 md:px-4 ">
          {products.map((itm) => {
            return (
              <section key={itm.id} className="">
                {itm.properties.map((item) => {
                  return (
                    <section key={item._id}>
                      {item.accessories.map((items, index) => {
                        return <p key={index}>{items}</p>;
                      })}
                    </section>
                  );
                })}
              </section>
            );
          })}
        </section>
      </section>
    </div>
  );
};

export default CompareProduct;
