import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import {
  useFavorites,
  useFavoritesActions,
} from "../component/Context/FavoritesProvider";
import SearchBox from "../component/SearchSort/Search";

const FavoritesList = () => {
  const { favoriteList } = useFavorites();
  const setFavorite = useFavoritesActions();

  const removeFavoriteList = (itm) => {
    setFavorite({ type: "RemoveFromFavorite", itms: itm });
  };
  const alertDeleteHandler = (itm) => {
    confirmAlert({
      // title: 'Confirm to submit',
      message: "آیا مطمئن هستید؟",
      buttons: [
        {
          label: "بله",
          onClick: () => removeFavoriteList(itm),
          // onClick: () => alert('با موفقیت حذف شد')
        },
        {
          label: "خیر",
          onClick: () => console.log("no"),
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  useEffect(() => {
    setFavorite({ type: "GetFromLS" });
  }, []);

  return (
    <div className=" container xl:max-w-screen-xl absolute top-24 left-0 right-0">
      <section className="">
        <SearchBox />
      </section>
      <h1 className=" mt-10 text-center font-extrabold text-2xl border-b-sky-900 border-b-2 py-2">
        لیست علاقه مندی ها
      </h1>
      {favoriteList.length === 0 && (
        <h1 className=" text-center text-pink-600 rounded m-auto  font-extrabold px-10 py-4">
          هیچ محصولی در لیست علاقه مندی های شما نیست
        </h1>
      )}
      <section className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 container xl:max-w-screen-xl h-full ">
        {favoriteList.map((itm) => {
          return (
            <section
              key={itm._id}
              className="flex items-start justify-start m-auto gap-2 mb-4  "
            >
              {/* <Link to={`product/DetailProduct/${itm.id}`}> */}
              <Link to={`/${itm.idmain}`}>
                {" "}
                <img src={itm.image} className="rounded w-28 h-28 " />
              </Link>

              {/* TITLE */}
              <section className="mr-6 flex flex-col items-start">
                <h1 className="py-1 text-sm">
                  {itm.type} {itm.brand} {itm.title}
                </h1>

                {/* Price */}
                <h1 className="py-1 text-center text-md font-bold">
                  {" "}
                  {itm.price} تومان
                </h1>

                {/* Delete */}
                <section className=" flex items-center py-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 rounded-full border-2 font-extrabold border-opacity-70 text-pink-600 border-pink-600 my-auto transition-all delay-75 hover:scale-150 hover:rotate-90 cursor-pointer  "
                    onClick={() => alertDeleteHandler(itm)}
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
                  <span className=" text-sm ">حذف از علاقه مندی ها</span>
                </section>
              </section>
            </section>
          );
        })}
      </section>
    </div>

    // <div className="grid gap-10 gap-y-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 absolute pt-36 text-sky-900">
    //   {favoriteList.map((itm) => {
    //     return (
    //       <section
    //         key={itm._id}
    //         className="flex flex-col items-center overflow-hidden cursor-pointer bg-slate-50 hover:scale-110 transition-all delay-200"
    //       >
    //         {/* image */}
    //         <Link to={`product/DetailProduct/${itm._id}`}>
    //           <img
    //             src={itm.image}
    //             alt={`${itm.type} ${itm.brand} ${itm.title}`}
    //             className=" h-48 w-48 rounded"
    //           />
    //         </Link>

    //         {/* Remove From List */}
    //         <section
    //           className="flex items-center mt-2"
    //           onClick={() => removeFavoriteList(itm)}
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="h-6 w-6 text-red-600 border-2 rounded-full border-red-500 ml-1"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //             strokeWidth="2"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               d="M6 18L18 6M6 6l12 12"
    //             />
    //           </svg>
    //           <h1 className=" text-sm">حدف از علاقه مندی ها</h1>
    //         </section>

    //         <section>
    //           <h1 className="text-center">
    //             {" "}
    //             {itm.type} {itm.brand} {itm.title}{" "}
    //           </h1>
    //           <h1 className="text-center  font-bold mt-1 text-lg">
    //             {itm.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
    //             <span className="font-normal text-sm"> تومان </span>
    //           </h1>
    //         </section>
    //       </section>
    //     );
    //   })}
    // </div>
  );
};

export default FavoritesList;
