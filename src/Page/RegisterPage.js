import { useFormik } from "formik";
import * as yup from "yup";
import RegUser from "../ServicesHttp/RegUser";
import {
  useAuthUser,
  useAuthUserActions,
} from "../component/Context/AuthUserProvider";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "../component/Hook/useQuery";
import SearchBox from "../component/SearchSort/Search";

const RegisterPage = () => {
  const setAuthUser = useAuthUserActions();
  const authUser = useAuthUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const query = useQuery();
  const redirect = query.get("redirect") || "/";

  // const focusRef = useRef();
  // useEffect(() => {
  //   focusRef.current.focus();
  // }, []);
  useEffect(() => {
    if (authUser) navigate(redirect);
  }, [authUser, redirect]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
      phoneNumber: "",
    },
    onSubmit: (values) => {
      const infoUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
      };

      RegUser(infoUser)
        .then((res) => {
          setAuthUser(res.data);
          localStorage.setItem("AuthUser", JSON.stringify(res.data));
          setError(res.status);
          navigate(redirect);
        })
        .catch((err) => {
          if (err.response && err.response.data.message) {
            setError(err.response.data.message);
            console.log(err.response.data.message);
          }
        });
    },
    validationSchema: yup.object({
      name: yup.string().required("لطفا نام کاربری را وارد کنید"),
      phoneNumber: yup.string().required("لطفا شماره تلفن را وارد کنید"),
      email: yup.string().email("فرمت ایمیل درست نیست"),
      password: yup
        .string()
        .required("لطفا رمز عبور را وارد کنید")

        .matches(
          "^(?=.*[A-Za-z])(?=.*[0-9])",
          "رمز عبور حداقل باید شامل یک حرف باشد"
        ),
      repassword: yup
        .string()
        .required("لطفا رمز عبور را تکرار کنید")
        .oneOf([yup.ref("password"), null], "رمز عبور همخوانی ندارد"),
    }),
  });

  return (
    <div className=" container xl:max-w-screen-xl  absolute top-24 left-0 right-0">
      <section className=" ">
        <SearchBox />
      </section>
      <div
        className=" flex flex-col mx-auto px-4 sm:px-0   md:grid gap-0 md:grid-cols-6 absolute top-24 left-0 right-0     
       text-sky-900 "
      >
        {/* Register */}
        <section
          className="  col-span-6 md:col-span-4 xl:col-span-4  lg:mr-72   md:border-l-2 bg-gray-100  "
        >
          <h1 className=" text-center mt-3 pb-3 font-extrabold text-3xl border-b-4   ">
            ثبت نام
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="px-2 py-1 text-sky-900"
          >
            <p
              className={`${
                error &&
                " font-bold text-pink-600 bg-slate-50 rounded py-1 text-center"
              }`}
            >
              {error}
            </p>
            <input
              // ref={focusRef}
              type="text"
              placeholder="نام"
              name="name"
              {...formik.getFieldProps("name")}
              className="py-2 px-4  rounded w-full mt-2 outline-none "
            />
            {formik.errors.name && formik.touched.name && (
              <p className=" text-pink-600 text-sm mt-1 ">
                {formik.errors.name}
              </p>
            )}

            <input
              type="text"
              placeholder="ایمیل"
              name="email"
              {...formik.getFieldProps("email")}
              className=" py-2 px-4 rounded w-full mt-2  outline-none "
            />
            {formik.errors.email && formik.touched.email && (
              <p className=" text-pink-600 text-sm mt-1 ">
                {formik.errors.email}
              </p>
            )}

            <input
              type="text"
              placeholder="شماره تلفن"
              name="phoneNumber"
              {...formik.getFieldProps("phoneNumber")}
              className=" py-2 px-4 rounded w-full mt-2  outline-none "
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <p className=" text-pink-600 text-sm mt-1 ">
                {formik.errors.phoneNumber}
              </p>
            )}

            <input
              type="password"
              placeholder="رمز عبور"
              name="password"
              {...formik.getFieldProps("password")}
              className=" py-2 px-4 rounded w-full mt-2  outline-none "
            />
            {formik.errors.password && formik.touched.password && (
              <p className=" text-pink-600 text-sm mt-1 ">
                {formik.errors.password}
              </p>
            )}

            <input
              type="password"
              placeholder="تکرار رمز عبور"
              name="repassword"
              {...formik.getFieldProps("repassword")}
              className=" py-2 px-4 rounded w-full mt-2  outline-none "
            />
            {formik.errors.repassword && formik.touched.repassword && (
              <p className=" text-pink-600 text-sm mt-1 ">
                {formik.errors.repassword}
              </p>
            )}
            <button
              type="submit"
              className=" bg-pink-600 text-white text-lg sm:text-2xl font-bold  py-2 px-4 rounded w-full my-3 outline-none "
            >
              ثبت نام
            </button>
          </form>
        </section>

        {/* Login */}
        <section
          className=" w-2/4 text-center mt-1 mx-auto md:mt-0 md:mx-0 overflow-hidden   md:grid md:col-span-2 xl:col-span-2 
      md:my-auto  rounded bg-gray-100 md:text-left  "
        >
          <section className=" inline-block mt-5 w-full  text-center">
            <h1 className="  font-bold pb-5 text-sm text-center  border-b-4">
              ثبت نام کردید
            </h1>

            <Link
              to="/Login?redirect=/CheckOut"
              className=" font-extrabold items-center  mx-auto flex justify-center hover:bg-sky-600 hover:text-white pb-4 "
            >
              <span className=" flex items-center justify-center  text-2xl">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>{" "}
                <h1 className="mr-2 mt-2">ورود</h1>{" "}
              </span>
            </Link>
          </section>
        </section>
      </div>
    </div>
  );
};

export default RegisterPage;
