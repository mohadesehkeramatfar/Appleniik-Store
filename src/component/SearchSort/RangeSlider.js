import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Range } from "react-range";
import {
  useCopyProduct,
  useCopyProductActions,
  useProduct,
} from "../Context/GurdProductProvider";
import { motion } from "framer-motion";

const RangeSlider = () => {
  const copyProducts = useCopyProduct();
  const setCopyProducts = useCopyProductActions();
  const products = useProduct();
  const [showRangSlider, setShowRangSlider] = useState(false);
  const [range, setRange] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500000);
  const initialMinValue = 0;
  const initialMaxValue = 500000;
  const step = 20000;
  const priceCap = 10000;
  const progressRef = useRef();
  const [minValue, setMinValue] = useState(initialMinValue);
  const [maxValue, setMaxValue] = useState(initialMaxValue);

  const maxValueHandler = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else if (parseInt(e.target.value) > maxValue) {
      setMaxValue(parseInt(e.target.value));
    }
  };

  const minValueHandler = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else if (parseInt(e.target.value) < minValue) {
      setMinValue(parseInt(e.target.value));
    }
  };

  const inputMinHandler = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else if (parseInt(e.target.value) < minValue) {
      setMinValue(parseInt(e.target.value));
    }
  };

  const inputMaxHandler = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else if (parseInt(e.target.value) > maxValue) {
      setMaxValue(parseInt(e.target.value));
    }
  };

  const selectRangePriceHandler = () => {
    setRange(true);
    setShowRangSlider(false);
    const filteredItem = products.filter(
      (itm) => itm.price >= minValue && itm.price <= maxValue
    );
    setCopyProducts(filteredItem);
    console.log("minValue", minValue, "maxValue", maxValue);
  };

  const showBoxRange = () => {
    setShowRangSlider(!showRangSlider);
  };

  // useEffect(() => {
  //   progressRef.current.style.left = (minValue / max) * step + "%";
  //   progressRef.current.style.right = step - (maxValue / max) * step + "%";
  // }, [minValue, maxValue]);
  return (
    <section className=" z-50">
      <section
        className=" flex items-center text-sm  cursor-pointer"
        onClick={showBoxRange}
      >
        <h1 className="">
          {range ? (
            <p className=" text-sm">
              بین{" "}
              {minValue.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
              تومان تا{" "}
              {maxValue.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
              تومان{" "}
            </p>
          ) : (
            "محدوده قیمت"
          )}
        </h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={range ? "hidden" : "h-4 w-4 font-bold"}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </section>

      <section className="  ">
        <section
          className={
            showRangSlider
              ? " flex flex-col w-80 mt-2  rounded-xl px-4 absolute left-10 border-2 sm:left-auto z-50 bg-white transition-all delay-700 duration-500 ease-in-out"
              : "hidden"
          }
        >
          {/* INPUT SECTION */}
          <div className=" flex items-center justify-between mt-2">
            <div className=" rounded-md ">
              <span className="text-sm pl-2 ">کمترین</span>
              <input
                type="number"
                onChange={(e) => inputMinHandler(e)}
                value={minValue}
                className="w-20 text-sm pr-2 rounded-md border border-gray-400"
              />
            </div>
            {/* <div className=" ml-2 font-semibold text-lg"> -</div> */}
            <div>
              <input
                type="number"
                value={maxValue}
                onChange={(e) => inputMaxHandler(e)}
                className="w-20 text-sm pr-2 rounded-md border border-gray-400"
              />
              <span className="text-sm mr-2 ">بیشترین</span>
            </div>
          </div>

          {/* SLIDER */}
          <div className=" my-3  ">
            <div className=" slider relative h-1 rounded-md bg-gray-300 ">
              <div className=" progress absolute h-1 bg-red-300 rounded"></div>
            </div>

            <div className=" range-input relative ">
              <input
                onChange={minValueHandler}
                type="range"
                value={minValue}
                min={min}
                max={max}
                className=" range-min absolute w-full -top-1 h-1 bg-transparent appearance-none cursor-pointer"
                //
              />
              <input
                onChange={maxValueHandler}
                type="range"
                value={maxValue}
                min={min}
                max={max}
                className=" range-max absolute w-full -top-1 h-1 bg-transparent appearance-none cursor-pointer "
              />
            </div>

            <div className=" flex items-center justify-between text-sm mt-3 text-pink-600">
              <button onClick={() => setShowRangSlider(false)}>لغو</button>
              <button onClick={selectRangePriceHandler}>تایید</button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default RangeSlider;
