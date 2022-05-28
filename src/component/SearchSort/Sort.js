import { Tab } from "@headlessui/react";
import { Fragment, useState, useEffect, useRef } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import _ from "lodash";
import MultiRangeSlider from "multi-range-slider-react";

import {
  useProduct,
  useProductActions,
  useCopyProduct,
  useCopyProductActions,
} from "../Context/GurdProductProvider";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import RangeSlider, {
  RangeSliderPosition,
  RangeSliderProps,
} from "@gilbarbara/react-range-slider";
const product = [
  { name: "قاب" },
  { name: "بند اپل واچ" },
  { name: "کیس ایرپاد" },
];
const productType = [
  { name: "13 پرومکس" },
  { name: "13 پرو" },
  { name: "13" },
  { name: "12 پرومکس" },
  { name: "12 پرو" },
  { name: "12 " },
];

const Sort = () => {
  const copyProduct = useCopyProduct();
  const setCopyProduct = useCopyProductActions();

  const ascHandler = () => {
    const sortPriceAsc = _.orderBy(copyProduct, ["price"], ["asc"]);
    setCopyProduct(sortPriceAsc);
  };

  const descHandler = () => {
    const sortPriceAsc = _.orderBy(copyProduct, ["price"], ["desc"]);
    setCopyProduct(sortPriceAsc);
  };
  return (
    <div className="  flex items-center  ">
      {/* SORT TAB SECTION for size MD */}
      <div className="hidden lg:flex justify-start items-center   ">
        <section className="mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 ml-1 flex items-start   stroke-sky-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
            />
          </svg>
        </section>
        <Tab.Group className="text-sm ">
          <Tab.List>
            {/* جدیدترین */}
            <Tab
              className={({ selected }) =>
                selected
                  ? "bg-sky-600 text-white px-2 py-2 rounded-xl transition-all  duration-300 ease-in-out animate-pulse  "
                  : " px-2 "
              }
            >
              <span onClick={() => ascHandler()}> جدیدترین</span>
            </Tab>

            {/* ارزانترین */}
            <Tab
              className={({ selected }) =>
                selected
                  ? "bg-sky-600 text-white px-2 py-2 rounded-xl transition-all  duration-300 ease-in-out animate-pulse  "
                  : " px-2 "
              }
            >
              <span onClick={() => ascHandler()}> ارزان ترین</span>
            </Tab>

            {/* گرانترین */}
            <Tab
              className={({ selected }) =>
                selected
                  ? "bg-sky-600 text-white px-2 py-2 rounded-xl transition-all  duration-300 ease-in-out animate-pulse  "
                  : "  px-2"
              }
            >
              <span onClick={() => descHandler()}>گران ترین</span>
            </Tab>

            <Tab
              className={({ selected }) =>
                selected
                  ? "bg-sky-600 text-white px-2 py-2 rounded-xl transition-all  duration-300 ease-in-out animate-pulse  "
                  : "  px-2"
              }
            >
              پرفروش ترین
            </Tab>
          </Tab.List>
        </Tab.Group>
      </div>

      {/* FOR SIZE MOBILE */}
      <div className=" inline-block lg:hidden z-10 ">
        <Menu as="div" className="relative  flex items-center text-left ">
          <div>
            <Menu.Button
              className="inline-flex justify-center  w-full px-2  py-1 text-sm text-sky-900 rounded-md font-extrabold 
          hover:bg-sky-600 hover:text-white focus:outline-none focus-visible:ring-2  focus-visible:ring-white 
          focus-visible:ring-opacity-75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7  "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>{" "}
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="absolute  top-10 right-0 w-56 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md
           shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="px-1 py-1 z-50 rounded-xl  ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-sky-600 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      جدیدترین
                    </button>
                  )}
                </Menu.Item>

                <button
                  className=" text-right w-full"
                  onClick={() => ascHandler()}
                >
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? " bg-sky-600 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm z-50`}
                      >
                        ارزانترین
                      </button>
                    )}
                  </Menu.Item>
                </button>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => descHandler()}
                      className={`${
                        active ? "bg-sky-600 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      گرانترین
                    </button>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-sky-600 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      پرفروش ترین
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Sort;
