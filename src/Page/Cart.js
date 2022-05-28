import { useState, useEffect } from "react";
import { useCart, useCartActions } from "../component/Context/CartProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import SearchBox from "../component/SearchSort/Search";
import {
  useAuthUser,
  useAuthUserActions,
} from "../component/Context/AuthUserProvider";
const Cart = () => {
  const { cartList, totalCount, totalPrice } = useCart();
  const setCart = useCartActions();
  const [selectedNumber, setselectedNumber] = useState(1);
  const setAuthUser = useAuthUserActions();
  const authUser = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    setCart({ type: "LocalStorage" });
  }, []);

  const alertDeleteHandler = (itm) => {
    confirmAlert({
      // title: 'Confirm to submit',
      message: "آیا مطمئن هستید؟",
      buttons: [
        {
          label: "بله",
          onClick: () => deleteHandler(itm),
        },
        {
          label: "خیر",
          onClick: () => console.log("no"),
        },
      ],
    });
  };

  const incrementHandler = (itm) => {
    setselectedNumber(selectedNumber);
    setCart({
      type: "addToCart",
      itm: itm,
      amountRequired: selectedNumber,
    });
  };

  const decrementHandler = (itm) => {
    setselectedNumber(selectedNumber);
    setCart({ type: "decrement", itm: itm, amountRequired: selectedNumber });
  };

  const deleteHandler = (itm, amountRequired) => {
    setCart({ type: "delete", itm: itm, amountRequired: amountRequired });
  };

  const checkOutHandler = () => {
    if (authUser) navigate("/CheckOut");
    else {
      navigate("/Register?redirect=/CheckOut");
    }
  };

  return (
    <div className="container xl:max-w-screen-xl  flex  flex-col absolute top-24 right-0 left-0   ">
      <section className="">
        <SearchBox />
      </section>

      {/* CARTLIST */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-[5%] ">
        <section className=" md:col-span-8  border-2 rounded px-4 py-2 border-opacity-50 border-gray-100 shadow-md  ">
          {cartList.map((itm) => {
            return (
              <section key={itm.id} className="flex border-b-2 mb-2 py-2">
                {/* IMAGES */}
                <Link to={`/${itm.idmain}`}>
                  <img src={itm.image} className=" w-28 h-24 rounded " />
                </Link>

                {/* DESCRIPTION */}
                <section className=" flex flex-col items-start  mx-2 text-xs">
                  <h1 className=" text-lg font-bold pb-1">
                    {itm.type} {itm.brand} {itm.title}
                  </h1>

                  <h1 className=" text-center text-sm pb-1">
                    {itm.price
                      .toFixed(0)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                    <span> تومان</span>
                  </h1>

                  <h1 className="pb-1">مدل :{itm.model}</h1>

                  <section className=" flex items-center ">
                    <h1 className="">تعداد: {itm.amountRequired}</h1>

                    {/* INCREMENTE Decrement Delete */}
                    <section className=" flex items-center mr-4">
                      {/* BOX COUNT FOR INCREMENT OR DECREMENT */}
                      <section className="flex items-center border-2  ml-1 mr-2 rounded ">
                        <button
                          onClick={() =>
                            incrementHandler(itm, itm.amountRequired)
                          }
                          className="px-2 py-0.5 text-sky-900  border-l-2 text-center"
                        >
                          +
                        </button>
                        <h1 className="px-2 py-0.5  text-center border-l-2 ">
                          {itm.amountRequired}
                        </h1>

                        {itm.amountRequired === 1 ? (
                          <svg
                            onClick={() => decrementHandler(itm)}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-full text-pink-600 w-3 mr-1 ml-1 py-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        ) : (
                          <button
                            onClick={() => decrementHandler(itm)}
                            className="px-2 py-0.5 text-pink-600   text-center"
                          >
                            -
                          </button>
                        )}
                      </section>
                      {/* DELETE BUTTON */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3  font-extrabold border-opacity-70 text-pink-600 border-pink-600 my-auto transition-all delay-75 hover:scale-150 hover:rotate-90 cursor-pointer  "
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
                    </section>
                  </section>
                </section>
              </section>
            );
          })}
        </section>

      <section className="md:col-span-4">
      <section className="  border-opacity-50 border-2 border-gray-100 shadow-md px-4 py-2">
          <section className=" border-b-2">
            <h1 className=" text-sm   py-2 text-gray-500 ">
              تعداد سفارشات :{" "}
              <span>
                {cartList.length} کالا ({totalCount}عدد)
              </span>
            </h1>
            <h1 className=" text-sm py-2 text-gray-500 ">
              قیمت کالاها :
              <span>
                {totalPrice
                  .toFixed(0)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                تومان
              </span>
            </h1>

            <h1 className=" text-sm py-2 text-gray-500 ">
              تخفیف کالاها :<span>0 تومان</span>
            </h1>
          </section>
          <h1 className=" font-bold  py-2">
            جمع سبد خرید:{" "}
            <span>
              {" "}
              {totalPrice
                .toFixed(0)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
              تومان
            </span>
          </h1>

          <button
            onClick={checkOutHandler}
            disabled={totalPrice == 0}
            className={
              totalPrice !== 0
                ? "mt-4 rounded px-2 py-2 text-xl  font-extrabold bg-pink-600 text-white outline-none  w-full"
                : "mt-4 rounded px-2 py-2 text-xl  font-extrabold bg-slate-300 text-white  w-full cursor-not-allowed"
            }
          >
            ادامه خرید
          </button>
        </section>
      </section>
      </section>
    </div>
  );
};

export default Cart;
