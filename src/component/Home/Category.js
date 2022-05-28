import gard from "../../assets/image/product/56d159.jpeg";
import watch from "../../assets/image/product/124925.jpg";
import airPod from "../../assets/image/product/39bd0f.jpg";
import typesOf from "../../assets/image/product/247ad0.jpg";
import off from "../../assets/image/product/83427d.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";
const Category = () => {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //   });
  // }, []);
  AOS.init();
  return (
    <div
      className=" container xl:max-w-screen-xl mt-4 mb-4 absolute right-0 left-0"
      data-aos={"zoom-in"}
      data-aos-duration="2000"
    >
      <h1 className=" font-extrabold  mb-7 text-center text-2xl">
        دسته بندی محصول
      </h1>
      <main className=" w-full h-[19rem] gap-4  grid grid-cols-1 text-white  sm:grid-cols-4  sm:grid-rows-2  mb-10">
        <section className="  relative    sm:col-span-2 sm:row-span-2  cursor-pointer rounded">
          <section className="  flex absolute items-center justify-center w-full  h-full rounded">
            {" "}
            <span className="font-extrabold  text-4xl text-center   border-white   z-10 ">
              قاب گوشی
            </span>
          </section>
          <img
            src={gard}
            className="relative  h-full w-full rounded hover:scale-105 transition-all delay-75 duration-500  ease-in "
          />
        </section>

        <section className=" cursor-pointer  relative  sm:col-span-1 sm:row-span-1  shadow rounded">
          <section className=" flex absolute items-center w-full h-full">
            <span className="font-extrabold text-xl text-center w-full  mx-auto  border-white   z-10 ">
              لوازم جانبی اپل واچ
            </span>
          </section>
          <img
            src={watch}
            className="relative  h-full w-full rounded hover:scale-105 transition-all delay-75 duration-500 ease-in "
          />
        </section>

        <section className="  relative sm:col-span-1 sm:row-span-1 cursor-pointer rounded">
          <section className=" flex absolute items-center w-full h-full">
            <span className="font-extrabold text-2xl text-center w-full mx-auto  border-white   z-10 ">
              لوازم جانبی ایرپاد
            </span>
          </section>
          <img
            src={airPod}
            className="relative  h-full w-full rounded hover:scale-105 transition-all delay-75 duration-500  ease-in"
          />
        </section>

        <section className="  relative sm:col-span-1 sm:row-span-1 cursor-pointer rounded">
          <section className=" flex absolute items-center w-full h-full">
            <span className="  bottom-0    font-extrabold text-2xl text-center w-full mx-auto  border-white   z-10 ">
              انواع لوازم جانبی
            </span>
          </section>
          <img
            src={typesOf}
            className="relative  h-full w-full rounded hover:scale-105 transition-all delay-75 duration-500  ease-in "
          />
        </section>

        <section className="  relative  sm:col-span-1 sm:row-span-1 cursor-pointer rounded">
          <section className=" flex absolute items-center w-full h-full">
            <span className=" bottom-0    font-extrabold text-2xl text-center w-full mx-auto  border-white   z-10 ">
              حراج شگفت انگیز
            </span>
          </section>
          <img
            src={off}
            className="relative  h-full w-full rounded hover:scale-105 transition-all delay-75 duration-500  ease-in "
          />
        </section>
      </main>
    </div>
  );
};

export default Category;
