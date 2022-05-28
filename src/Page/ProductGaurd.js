import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  useCopyProduct,
  useCopyProductActions,
  useProduct,
  useProductActions,
} from "../component/Context/GurdProductProvider";
import { Link } from "react-router-dom";
import GetProducts from "../ServicesHttp/getProducts";
import {
  useFavorites,
  useFavoritesActions,
} from "../component/Context/FavoritesProvider";
import loading from "../assets/image/0 mv8MNRLDNNnt5f72.gif";

const ProductGaurd = () => {
  const products = useProduct();
  const setProducts = useProductActions();
  const copyProduct = useCopyProduct();
  const setCopyProduct = useCopyProductActions();

  useEffect(() => {
    // let componentMounted = true;
    GetProducts()
      .then((res) => {
        setProducts(res.data);
        setCopyProduct(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  // const favoritesHandler = (itm) => {
  //   setFavorite({ type: "AddToFavorite", itms: itm });
  //   setFlagFavorites(!flagFavorites);
  //   // setCopyProduct({...copyProduct,favorite:!itm.favorite})
  // };

  return (
    <div
      className="container  xl:max-w-screen  grid gap-1  gap-y-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
    lg:grid-cols-4 absolute top-28 left-0 right-0 "
      data-aos="fade-right"
      data-aos-easing="ease-in-sine"
      data-aos-duration="1000"
    >
      {!copyProduct ? (
        <section className="  w-screen container xl:max-w-screen-xl  absolute left-0 right-0">
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
              className="flex  flex-col relative items-center  overflow-hidden cursor-pointer rounded  "
            >
              {/* image Section  */}
              <Link to={`/${itm._id}`}>
                <img
                  className=" ml-2 rounded relative px-0 mx-0 w-56 h-48 hover:scale-105 overflow-hidden transition-all duration-1000   "
                  src={itm.image}
                />
              </Link>

              {/* Description Section */}
              <Link
                to={`/${itm._id}`}
                className=" text-sky-900 w-full pt-2 text-sm rounded-xl "
              >
                <h1 className=" text-center  rounded">
                  {itm.type} {itm.brand} {itm.title}
                </h1>
                <h1 className=" text-center  font-bold text-xl">
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
  );
};

export default ProductGaurd;
