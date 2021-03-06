import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import Properties from "../component/DeatilProduct/Proprties";
import { useEffect, useRef, useState } from "react";
import GetOneProduct from "../ServicesHttp/getOneProduct";
import { useCart, useCartActions } from "../component/Context/CartProvider";
import {
  useFavorites,
  useFavoritesActions,
} from "../component/Context/FavoritesProvider";
import Aside from "../component/DeatilProduct/Aside";
import UserComments from "../component/DeatilProduct/UserComments";
import { useToasts } from "react-toast-notifications";

const DetailProduct = () => {
  const idParams = useParams();
  const id = idParams.id;
  const [detailProduct, setDetailProduct] = useState([]);
  const [detailProductByModel, setDetailProductByModel] = useState([]);
  const [detailProductThumbnail, setDetailProductThumbnail] = useState([]);
  const [flagCount, setFlagCount] = useState(false);
  const [flagCheckCart, setFlagCheckCart] = useState(false);
  const [count, setCount] = useState();
  const [selectedProduct, setSelectedProduct] = useState({
    type: "",
    brand: "",
    price: "",
    model: "",
    title: "",
    id: "",
  });
  const [selectedNumber, setselectedNumber] = useState(1);
  const [flagActiveButton, setflagActiveButton] = useState();
  const { cartList, warning } = useCart();
  const setCart = useCartActions();
  const [warningStock, setWarningStock] = useState(false);
  const { favoriteList } = useFavorites();
  const setFavorite = useFavoritesActions();
  const [flagFavorites, setFlagFavorites] = useState(false);
  const { addToast } = useToasts();
  const nav = useNavigate();
  const [showMainImage, setShowMainImage] = useState(false);
  const elm = useRef();
  var oL = 10;
  var cW = 0;
  const [position, setPosition] = useState(1);
  const [positionBigImage, setPositionBigImage] = useState(0);
  const onNext = () => {
    if (position < detailProductThumbnail.length - 1) {
      setPosition(position + 1);
      oL = elm.current.offsetLeft - 300;
      cW = elm.current.clientWidth;
    }
  };

  const onPrev = () => {
    if (position > 1) {
      setPosition(position - 1);
    }
  };

  useEffect(() => {
    GetOneProduct(id)
      .then((res) => {
        setDetailProduct(res.data);
        setDetailProductByModel(res.data.byModel);
        setDetailProductThumbnail(res.data.thumbnailImage);
        console.log("useeffect",detailProduct);
      })
      .catch((err) => console.log(err));
  }, []);

  const favoritesHandler = (detailProduct) => {
    setFavorite({ type: "AddToFavorite", itms: detailProduct });
  };

  const showSelectedByModel = (stock, id, model) => {
    setWarningStock(false);
    setCount(stock);
    const flagActiveBTN = id;
    setflagActiveButton(flagActiveBTN);
    setFlagCheckCart(false);
    setFlagCount(true);
    setSelectedProduct({
      ...selectedProduct,
      image: detailProduct.image,
      title: detailProduct.title,
      type: detailProduct.type,
      brand: detailProduct.brand,
      price: detailProduct.price,
      id: id,
      idmain: detailProduct._id,
      model: model,
      stockSelectedProduct: stock,
      amountRequired: selectedNumber,
    });
  };

  const addToCartHandler = () => {
    if (selectedProduct.brand === "") {
      setFlagCheckCart(true);
    } else {
      setFlagCheckCart(false);
      const flagActiveBTN = selectedProduct.id;
      setflagActiveButton(flagActiveBTN);
      setCart({
        type: "addToCart",
        itm: selectedProduct,
        amountRequired: selectedNumber,
      });
      addToast(
        `?????? ${selectedProduct.title} ?????? ${selectedProduct.model} ???? ?????? ???????? ?????? ?????????? ????`,
        {
          appearance: "success",
          autoDismiss: "true",
          placement: "top-center",
        }
      );
     

    }
  };

  const compareHandler = (detailProduct) => {
    nav("/CompareProduct", { state: { detailProduct } });
  };

  const showMainImageHandler = () => {
    setShowMainImage(true);
  };

  //  THIS CODE IS  FOR SHOW BOGIMAGE
  const nextHandler = () => {
    if (positionBigImage < detailProductThumbnail.length - 1) {
      setPositionBigImage(positionBigImage + 1);
      oL = elm.current.offsetLeft;
    }
  };

  const prevHandler = () => {
    if (positionBigImage > 0) {
      setPositionBigImage(positionBigImage - 1);
    }
  };

  return (
    <div className="container xl:max-w-screen-xl left-0 right-0 gap-80 md:gap-36 flex flex-col   absolute top-28 ">
      <section
        className={
          showMainImage
            ? " opacity-30 md:flex  "
            : " opacity-100 md:flex  "
        }
      >
        {/* IMAGE */}
        <section className=" w-52   mx-auto md:mx-0 flex gap-2 flex-col">
          {/* MAIN IMAGE */}
          <section
            className="main w-full h-32 z-20"
            onClick={showMainImageHandler}
          >
            <img
              src={detailProduct.image}
              className="h-full w-full rounded-md border-2  "
            />
          </section>

          <section className=" relative  flex items-center ">
            {/* NEXT AND Prev Button */}
            <svg
              onClick={onNext}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 bg-sky-900 text-white z-20 rounded-full absolute  bg-opacity-70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <svg
              onClick={onPrev}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 bg-sky-900 text-white z-20 rounded-full absolute  bg-opacity-70 left-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {/* Thumbnail image */}
            <div
              onClick={showMainImageHandler}
              className="App flex border-4 shadow-gray-700 shadow-2xl relative  bg-slate-50  text-white border-white
             w-full h-24 overflow-hidden m-0 p-0 justify-center items-center "
            >
              <section className=" row  relative   ">
                {detailProductThumbnail.map((itm, index) => {
                  return (
                    <motion.section
                      key={index}
                      initial={{ rotation: -180 }}
                      animate={{
                        scale: 1,
                        right: `${(index - position) * (60 + oL)}vw`,
                        left: `${(index - position) * (75 - oL)}vw`,
                        //  result of i - p =>>> ?????? ?????? ???????????? ?????????? ?????? ?????? ?????????? ...... ?????? ?????? ???????????? ?????? ????????
                      }}
                      transition={{
                        type: "spring",
                        duration: 1,
                        stiffness: 360,
                        damping: 35,
                      }}
                      className=" container  overflow-hidden w-36 h-20 absolute -top-11 z-10 "
                      ref={elm}
                    >
                      <img
                        src={itm}
                        className="  rounded w-full h-full my-1 object-center z-10 "
                      />
                    </motion.section>
                  );
                })}
              </section>
            </div>
          </section>

          {/* FAVORITS AND COMPARE LOGO */}
          <section className=" flex justify-between  items-center z-10">
            {/* favorite */}
            <svg
              onClick={() => favoritesHandler(detailProduct)}
              xmlns="http://www.w3.org/2000/svg"
              className={
                flagFavorites
                  ? "h-6 w-6 cursor-pointer "
                  : "h-6 w-6 cursor-pointer "
              }
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

            {/* compare */}
            <svg
              onClick={() => compareHandler(detailProduct)}
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
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </section>
        </section>

        {/* Information */}
        <section className=" border-b-2  pb-4   absolute w-full right-0 left-0 pr-8 md:pr-64">
          {/* title and price */}
          <section className="flex flex-col my-3 text-center md:text-right font-bold md:font-extrabold text-lg md:text-xl  ">
            <h1 className="  mb-3 ">
              {detailProduct.type} {detailProduct.brand} {detailProduct.title}
            </h1>
            <h1 className="">
              {detailProduct.price}
              {/* {" "}
            {detailProduct.price
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "} */}
              <span> ??????????</span>
            </h1>
          </section>

          {/* Inventory */}
          <section className="flex pr-4  mb-3 items-center justify-start text-sm  ">
            <h1 className="font-bold text-center   ">
              ????????????:{" "}
              {flagCount && (
                <span className="px-1 underline text-pink-600 outline-none  ">
                  {count} <span>??????</span>
                </span>
              )}
            </h1>
          </section>

          {/* LIST MODEL */}
          <section className="mb-3  ">
            <h1 className=" pr-4 mb-3 text-xs font-bold">???????????? ?????? ????????:</h1>
            {detailProductByModel.map((itm) => {
              return (
                <button
                  key={itm._id}
                  disabled={itm.stock === 0}
                  className={
                    itm.stock !== 0
                      ? `${
                          flagActiveButton === itm._id &&
                          "border-4 outline-none border-sky-900"
                        }  border-2 px-2 rounded mr-2 mb-2 py-1 bg-gray-100  outline-none focus:border-2 focus:border-sky-900 focus:outline-none`
                      : "border px-2 rounded mr-2 py-1 mb-2 bg-gray-100 border-gray-400 outline-none decoration-red-600 decoration-double line-through text-opacity-25 bg-opacity-25 cursor-not-allowed opacity-30"
                  }
                  onClick={() =>
                    showSelectedByModel(itm.stock, itm._id, itm.model)
                  }
                >
                  {itm.model}
                </button>
              );
            })}
          </section>

          {/* CART BUTTON */}
          <section className=" flex items-center  justify-start mt-2 md:justify-start  ">
            <button
              onClick={() => addToCartHandler()}
              className=" ml-4 rounded px-4 py-2 text-md md:text-xl  font-extrabold bg-pink-600 text-white "
            >
              ???????????? ???? ?????? ????????
            </button>
            {flagCheckCart && (
              <span className=" text-pink-600 text-xs">
                ???????? ???? ?????? ???? ???????????? ????????!!!!
              </span>
            )}

            {/* {warning && warningStock && (
              <span className=" text-pink-600">
                ???????????????? ?????????? ???????????????? ?????? ?????????? ???? ???????????? ?????????? ??????
              </span>
            )} */}
          </section>
        </section>
      </section>

      {/* BOX SHOW BIG SIZE IMAGE  */}
      <section
        className={
          showMainImage
            ? "flex items-start justify-center z-30 absolute left-0 w-full h-full  "
            : "hidden"
        }
      >
        <section className=" w-96 h-80  rounded   bg-slate-50">
          {/* CLOSE BUTTON */}
          <section
            className=" w-full relative z-30 "
            onClick={() => setShowMainImage(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg "
              className="h-8 w-8 absolute left-0 ml-2 mt-2 text-pink-600"
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
          </section>

          {/* IMAGES */}
          <section className="App border-4 relative border-white w-full h-80 mx-auto  rounded  m-0 p-0 flex justify-center items-center overflow-hidden ">
            {/* NEXT AND Prev Button */}
            <section className="  w-full relative z-30">
              <section className="flex items-center justify-between ">
                <svg
                  onClick={nextHandler}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 bg-sky-900 text-white z-20 rounded-full   bg-opacity-70"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <svg
                  onClick={prevHandler}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 bg-sky-900 text-white z-20 rounded-full   bg-opacity-70 left-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </section>
            </section>

            <section className=" relative  ">
              {/* <img
                src={detailProduct.image}
                className=" w-3/4 h-3/4 mx-auto rounded "
              /> */}
              {detailProductThumbnail.map((itm, index) => {
                return (
                  <motion.section
                    key={index}
                    initial={{ scale: 0, rotation: -180 }}
                    animate={{
                      scale: 1,
                      left: `${(index - positionBigImage) * 100 - oL + oL}vw`,
                      // right:`${(index - positionBigImage) * 400 - oL - (oL*oL/2.5 )}vw`,
                      // right: `${(index - positionBigImage) *130 - oL }vw`,

                      scale: index === positionBigImage ? 1 : 0.8,
                    }}
                    transition={{
                      type: "spring",
                      duration: 1,
                      stiffness: 360,
                      damping: 35,
                    }}
                    className="container  overflow-hidden max-w-md w-96 h-96  rounded absolute -top-32 z-10"
                  >
                    <img
                      src={itm}
                      className="  rounded max-w-full w-full h-60 z-10"
                    />
                  </motion.section>
                );
              })}
            </section>
          </section>
        </section>
      </section>

      <section className={showMainImage ? " opacity-50" : " opacity-100"}>
        <Aside />
        <Routes>
          <Route path="properties" element={<Properties />} />
          <Route path="UserComments" element={<UserComments />} />
        </Routes>
      </section>
    </div>
  );
};

export default DetailProduct;

{
}

{
  /* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 rounded-full bg-sky-900 text-white bg-opacity-50 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg> */
}

// ?????? ???? ???????? ???????? ??????????
// if (!warning) {
//   addToast(
//     `??????${selectedProduct.title} ?????? ${selectedProduct.model} ???? ?????? ???????? ?????? ?????????? ????`,
//     {
//       appearance: "success",
//       autoDismiss: "true",
//       placement: "top-center",
//     }
//   );
// } else {
//   addToast(` ???????????????? ?????????? ???????????????? ?????? ?????????? ???? ???????????? ?????????? ??????`, {
//     appearance: "error",
//     autoDismiss: "true",
//     placement: "top-center",
//   });
// }
