import { useEffect } from "react";
import { useAuthUser } from "../component/Context/AuthUserProvider";
import { useCart, useCartActions } from "../component/Context/CartProvider";
import SearchBox from "../component/SearchSort/Search";
// import "react-confirm-alert/src/react-confirm-alert.css";
import { useLocation, Link } from "react-router-dom";
const CheckOut = () => {
  const authUser = useAuthUser();
  const { cartList, totalCount, totalPrice } = useCart();
  const setCartList = useCartActions();
  const loc = useLocation();
    console.log(cartList);
  useEffect(() => {
    setCartList({ type: "LocalStorage" });
  }, []);
  return (
    <div className=" container xl:max-w-screen-xl absolute top-24 right-0 left-0">
      <section className=" ">
        <SearchBox />
      </section>

      <h1 className=" mt-10 text-center font-extrabold text-2xl border-b-sky-900 border-b-2 py-2">
        لیست سفارشات
      </h1>
      {/* Product List */}
      <section className=" flex-col sm:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
        {cartList.map((itm) => {
          return (
            <Link
              to={`/${itm.idmain}`}
              key={itm.id}
              className="flex items-center gap-4 m-4"
            >
              <img src={itm.image} className="h-16 w-14 rounded" />
              <section className=" text-sm">
                <h1>
                  {itm.type} {itm.brand} {itm.title}
                </h1>
                <h1>مدل: {itm.model}</h1>
                <h1>
                  مبلغ: {itm.amountRequired} * {itm.price} ={" "}
                  {itm.amountRequired * itm.price} تومان
                </h1>
              </section>
            </Link>
          );
        })}
      </section>

      <section className=" flex flex-col md:flex-row px-4 py-2">
        {/* info User */}
        <section className=" flex flex-col border-2 px-4 py-2 text-center md:w-2/4 rounded ml-2">
          <h1 className="text-center font-extrabold mb-4 mt-2 border-b-2 border-b-sky-700 pb-2">
            اطلاعات شما
          </h1>

          <section className=" grid grid-cols-3 justify-items-start  gap-2">
            <label className=" col-span-1 place-self-stretch ">نام: </label>
            <input
              type="text"
              value={authUser.name}
              className="border-2 rounded px-4 py-2 w-full col-span-2 justify-self-stretch "
            />
            <label className="  col-span-1 place-self-stretch  ">شماره تلفن: </label>
            <input
              type="text"
              value={authUser.phoneNumber}
              className="border-2 rounded px-4 py-2 w-full col-span-2 "
            />
            <label className=" col-span-1 place-self-stretch">آدرس </label>
            <textarea
              value="آدرس"
              className="border-2 rounded px-4 py-2 w-full  mb-4 resize-none col-span-2"
            />
          </section>
        </section>

        {/*Payment informationInfo  */}
        <section className="md:w-2/4 border-2 px-4 py-2 rounded ">
          <h1 className=" text-center font-extrabold mb-8 mt-2 border-b-2 border-b-sky-700 pb-2">
            اطلاعات پرداختی
          </h1>
          <h1 className=" mb-4 font-extrabold">
            مجموع کالای سفارش شده: {cartList.length}کالا ({totalCount} عدد)
          </h1>
          <h1 className=" mb-4 font-extrabold">
            مجموع پرداختی :{" "}
            {totalPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
            تومان
          </h1>
          <h1 className=" mb-4 font-extrabold text-lg">
            مجموع پرداختی بعد از تخفیف :{" "}
            {totalPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
            تومان
          </h1>
          <button className="mt-4 rounded px-2 py-2 text-xl  font-extrabold bg-pink-600 text-white  w-full">
            تسویه حساب
          </button>
        </section>
      </section>

      <section></section>
    </div>
  );
};

export default CheckOut;
