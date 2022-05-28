import { useState, useEffect } from "react";
import { useAuthUser, useAuthUserActions } from "../component/Context/AuthUserProvider";

const Profile = () => {
  const infoUser = useAuthUser();
  const [open, setOpen] = useState(false);
  const setAuth = useAuthUserActions()
  const authUser = useAuthUser()
  const [infoValue, setInfoValue] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(()=>{
    // setAuth({type:"GetFromLS"})
    JSON.parse(localStorage.getItem("AuthUser"))
  },[])

  const editHandler = () => {
    setOpen(!open);
    setInfoValue({
      name: infoUser.name,
      email: infoUser.email,
      phoneNumber: infoUser.phoneNumber,
      address: infoUser.address,
    });
  };

  const confirmEditHandler = () => {
    console.log(infoValue);
    // اینجا باید مسیر ادیت داشته باشم که بتونم ارسال کنم ... مربوط به بک اند می باشد
  };

  const infoHandler = (e) => {
    setInfoValue({ ...infoValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="absolute top-36 right-0 left-0 h-full   container xl:max-w-screen-xl m-auto ">
      {/* MAIN PAGE */}
      <h1 className=" border-b-2  font-extrabold text-2xl text-center mb-10 py-2">
        پرفایل شما
      </h1>
      <section
        className={` ${
          open
            ? " opacity-40 grid grid-cols-8 grid-rows-3 "
            : "grid grid-cols-8 grid-rows-3"
        } `}
      >
        {/* NAVBAR */}
        <section className="hidden  border-2 px-2  py-4 lg:inline-block row-span-1  lg:col-span-2 rounded-xl ml-4 cursor-pointer">
          <h1 className="  border-b-2 text-center py-4  hover:bg-sky-600 hover:text-white px-4 hover:rounded-xl ">
            اطلاعات کاربری
          </h1>
          <h1 className=" text-center py-4  border-b-2  hover:bg-sky-600 hover:text-white px-4 hover:rounded-xl">
            کیف پول کاربری
          </h1>
          <h1 className=" text-center py-4  hover:bg-sky-600 hover:text-white px-4 rounded-xl">
            تاریخچه خرید
          </h1>
        </section>

        {/* INFOUser */}
        <section className="relative px-2 border-2 rounded-xl text-center row-span-2    col-span-8 lg:col-span-6">
          {/*  اطلاعات کاربری*/}
          <section className="  border-b-2 py-4 text-center font-extrabold text-2xl">
            {" "}
            <h1 className="">اطلاعات کاربری</h1>
          </section>

          <section className=" flex items-center text-center ">
            <h1 className=" font-extrabold ml-1 my-3">نام : </h1>
            <span className=" ml-1"> {infoUser.name}</span>
          </section>

          <section className=" flex items-center ">
            <h1 className=" font-extrabold ml-1 my-3">ایمیل : </h1>
            <span className=" ml-1"> {infoUser.email}</span>
          </section>

          <section className=" flex items-center">
            <h1 className=" font-extrabold ml-1 my-3">شماره تلفن : </h1>
            <span className=" ml-1"> {infoUser.phoneNumber}</span>
          </section>

          <section className=" flex items-center">
            <h1 className=" font-extrabold ml-1 my-3">آدرس : </h1>
            <span className=" ml-1"> {infoUser.address}</span>
          </section>

          <button
            className=" bg-pink-600 text-white px-4 py-2 rounded-xl my-3 w-full lg:absolute lg:bottom-0 lg:left-0 lg:right-0"
            onClick={editHandler}
          >
            ویرایش اطلاعات
          </button>
        </section>
      </section>

      {/* box edit */}

      {open && (
        <div
          className=" bg-slate-100 flex-col rounded-xl absolute top-0 right-4 left-4 sm:left-28 sm:right-28 md:left-48 md:right-48 lg:left-10 lg:right-96 xl:w-2/4 xl:left-0 xl:right-96 h-auto shadow-lg px-4 
             ring-1 ring-black ring-opacity-5 
              focus:outline-none z-50"
        >
          {/* Box Edit Show */}
          <section>
            <section className=" border-b-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setOpen(false)}
                className="h-6 w-6 text-pink-600 font-extrabold my-2"
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
              <h1 className=" w-full font-extrabold text-center">
                ویرایش اطلاعات
              </h1>
            </section>

            <section className=" flex flex-col mt-4">
              {" "}
              <label className="mb-2">نام: </label>{" "}
              <input
                type="text"
                name="name"
                onChange={infoHandler}
                value={infoValue.name}
                className=" rounded-xl px-4 py-2 mb-4"
              />
            </section>

            <section className=" flex flex-col">
              {" "}
              <label className="mb-2">ایمیل: </label>{" "}
              <input
                name="email"
                onChange={infoHandler}
                type="text"
                value={infoUser.email}
                className=" rounded-xl px-4 py-2 mb-4"
              />
            </section>

            <section className=" flex flex-col">
              {" "}
              <label className="mb-2">شماره تلفن: </label>{" "}
              <input
                name="phoneNumber"
                onChange={infoHandler}
                type="text"
                value={infoUser.phoneNumber}
                className=" rounded-xl px-4 py-2 mb-4"
              />
            </section>

            <section className=" flex flex-col">
              {" "}
              <label className="mb-2">آدرس: </label>{" "}
              <textarea
                name="address"
                onChange={infoHandler}
                value={infoUser.address}
                className=" rounded-xl px-4 py-2 mb-4 resize-none"
              />
            </section>

            <button
              onClick={confirmEditHandler}
              className="bg-pink-600 text-white px-4 py-2 rounded-xl w-full mb-4"
            >
              ویرایش
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default Profile;
