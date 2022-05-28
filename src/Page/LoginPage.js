import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import {
  useAuthUser,
  useAuthUserActions,
} from "../component/Context/AuthUserProvider";
import { useQuery } from "../component/Hook/useQuery";
import SearchBox from "../component/SearchSort/Search";
import LoginUser from "../ServicesHttp/LoginUser";

const LoginPage = () => {
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const setAuthUser = useAuthUserActions();
  const authUser = useAuthUser();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  // const focusRef = useRef();
  // useEffect(() => {
  //   focusRef.current.focus();
  // }, []);

  useEffect(() => {
    if (authUser) navigate(redirect);
  }, [authUser, redirect]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      LoginUser(values)
        .then((res) => {
          setAuthUser(res.data);
          localStorage.setItem("AuthUser", JSON.stringify(res.data));
          navigate(redirect);
        })
        .catch((err) => {
          if (err.response && err.response.data.message) {
            setError(err.response.data.message);
          }
        });
    },

    validationSchema: yup.object({
      email: yup.string().required("*** لطفا ایمیل را وارد کنید"),
      password: yup.string().required("*** لطفا رمز عبور را وارد کنید"),
    }),
  });

  return (
    <div className=" absolute top-24 left-0 right-0   container xl:max-w-screen-xl ">
      <section className=" ">
        <SearchBox />
      </section>
      <div
        className=" flex flex-col mx-auto px-4 sm:px-0    md:grid gap-0 md:grid-cols-6   
    absolute top-24 left-0 right-0  text-sky-900 "
      >
        {/* LOGIN */}
        <section className="  col-span-6 md:col-span-4 xl:col-span-4  lg:mr-72   md:border-l-2 bg-gray-100 rounded  ">
          <h1 className=" text-center mt-3 pb-3 font-extrabold text-3xl border-b-4   ">
            ورود
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

            <button
              type="submit"
              className=" bg-pink-600 text-white text-lg sm:text-2xl font-bold  py-2 px-4 rounded w-full my-3 outline-none "
            >
              ورود
            </button>
          </form>
        </section>

        {/* Register */}
        <section
          className="w-2/4 text-center mt-1 mx-auto md:mt-0 md:mx-0 overflow-hidden   md:grid md:col-span-2 xl:col-span-2 
      md:my-auto  rounded bg-gray-100 md:text-left  "
        >
          <section className=" inline-block mt-5 w-full  text-center">
            <h1 className="  font-bold pb-5 text-sm text-center  border-b-4">
              هنوز ثبت نام نکردید!!!
            </h1>

            <Link
              to="/Register?redirect=/CheckOut"
              className=" font-extrabold items-center mx-auto flex justify-center hover:bg-sky-600 hover:text-white pb-4"
            >
              <span className=" flex items-center justify-center  text-2xl">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                <h1 className="mr-2 mt-2">ثبت نام</h1>{" "}
              </span>
            </Link>
          </section>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
