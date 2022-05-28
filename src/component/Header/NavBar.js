import { useState, Fragment } from "react";
import useCollapse from "react-collapsed";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const NavBar = () => {
  const [showHM, setShowHM] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ showHM });
  const [subMenuProduct, setSubMenuProduct] = useState(false);
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const showHumberMenuHandler = () => {
    setShowHM(!showHM);
  };
  return (
    <div>
      {/* Menu for mobile */}
      <section className="md:hidden block ">
        <svg
          // {...getToggleProps({
          //   onClick: showHumberMenuHandler,
          // })}
          onClick={showHumberMenuHandler}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white top-7 absolute "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </section>
      {/* show MENU Humberger */}
      {showHM && (
        <section
        //  {...getCollapseProps()}
         >
          <section className=" bg-sky-900 w-11/12 h-screen absolute top-0 z-50 right-0 ">
            <section className=" flex items-center justify-between mt-3 ">
              {/* Logo */}
              <section className="flex justify-center ">
                <h1 className="sm:text-3xl mx-4 my-3  font-bold bg-gradient-to-b from-white to-gray-400  bg-clip-text text-transparent  ">
                  Appleniik
                </h1>
              </section>

              {/* Close Button */}
              <section
                onClick={() => setShowHM(false)}
                className=" flex justify-end mx-4 my-3 font-bold cursor-pointer "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-pink-600 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </section>
            </section>

            {/* BORDER LINE */}
            <section className=" border-b-4 w-11/12 mx-auto"></section>
            {/* Menu items */}
            <section className=" mx-4 my-2 ">
              <section className=" text-white text-right">
                <section className="relative flex flex-col items-start ">
                  {/*    صفحه اصلی */}
                  <Link
                    onClick={() => setShowHM(!showHM)}
                    to="/"
                    className="
                    border-b border-white border-opacity-20 cursor-pointer w-full 
                    px-4 py-2 text-sm  text-white hover:rounded-md font-extrabold 
                  hover:bg-white hover:text-sky-600 focus:outline-none focus-visible:ring-2 
                  focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    صفحه اصلی
                  </Link>

                  {/* محصولات */}
                  <section className=" w-full bg-slate-800  border-b border-white border-opacity-20">
                    <Fragment>
                      <Accordion
                        className=" py-0 m-0 bg-sky-900 border-b border-opacity-20 border-white"
                        open={open === 1}
                        onClick={() => handleOpen(1)}
                      >
                        <section
                          className="  text-right  cursor-pointer w-full 
                            px-4 py-1.5   text-white hover:rounded-md font-extrabold 
                           hover:bg-white hover:text-sky-600 focus:outline-none focus-visible:ring-2 
                          focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                          <AccordionHeader className=" border-b-0 py-0 m-0">
                            <span className=" text-base">محصولات</span>
                          </AccordionHeader>
                        </section>
                        <AccordionBody className=" py-1">
                          <Link
                            onClick={() => setShowHM(!showHM)}
                            to="product"
                            className=" px-8 cursor-pointer w-full block
                             py-1.5 text-sm  text-white hover:rounded-md  
                            hover:bg-white hover:text-sky-600 focus:outline-none focus-visible:ring-2 
                          focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                            قاب موبایل
                          </Link>

                          <Link
                            onClick={() => setShowHM(!showHM)}
                            to=""
                            className=" px-8 cursor-pointer w-full block
                              py-1.5 text-sm  text-white hover:rounded-md  
                            hover:bg-white hover:text-sky-600 focus:outline-none focus-visible:ring-2 
                          focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                         کیس ایرپاد
                          </Link>

                          <Link
                            onClick={() => setShowHM(!showHM)}
                            to=""
                            className=" px-8 cursor-pointer w-full block
                              py-1.5 text-sm  text-white hover:rounded-md  
                            hover:bg-white hover:text-sky-600 focus:outline-none focus-visible:ring-2 
                          focus-visible:ring-white focus-visible:ring-opacity-75"
                          >
                         بند واچ
                          </Link>
                        </AccordionBody>
                      </Accordion>
                    </Fragment>
                  </section>

                  {/* ارتباط با ما */}
                  <Link
                    onClick={() => setShowHM(!showHM)}
                    to="ContactUs"
                    className="  border-b border-white border-opacity-20 cursor-pointer w-full 
                      px-4 py-2 text-sm  text-white hover:rounded-md font-extrabold 
                    hover:bg-white hover:text-sky-600 focus:outline-none focus-visible:ring-2 
                    focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    ارتباط با ما
                  </Link>

                  {/* درباره  ما */}
                  <Link
                    onClick={() => setShowHM(!showHM)}
                    to="AboutUs"
                    className="  border-b border-white border-opacity-20 cursor-pointer w-full 
                      px-4 py-2 text-sm  text-white hover:rounded-md font-extrabold 
                    hover:bg-white hover:text-sky-600 focus:outline-none focus-visible:ring-2 
                    focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    درباره ما
                  </Link>
                </section>
              </section>
            </section>
          </section>
        </section>
      )}

      {/* Menu for Screen */}
      <Menu
        as="div"
        className="relative  items-center text-left hidden md:flex  "
      >
        <div>
          <Link
            to="/"
            className="inline-flex justify-center cursor-pointer w-full px-4 py-2 text-sm  text-white rounded-md font-extrabold 
          hover:bg-white hover:text-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            صفحه اصلی
          </Link>
        </div>

        {/* محصولات */}
        <div>
          <Menu.Button
            className="inline-flex justify-center w-full px-4 py-2 text-sm  text-white rounded-md font-extrabold 
          hover:bg-white hover:text-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            محصولات
            <ChevronDownIcon
              className="w-5 h-5 ml-2 mr-1 text-sky-200 font-extrabold"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        {/* ارتباط با ما */}
        <div>
          <Link
            to="ContactUs"
            className="inline-flex justify-center cursor-pointer w-full px-4 py-2 text-sm  text-white rounded-md font-extrabold 
          hover:bg-white hover:text-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            ارتباط با ما
          </Link>
        </div>

        {/* درباره  ما */}
        <div>
          <Link
            to="AboutUs"
            className="inline-flex justify-center cursor-pointer w-full px-4 py-2 text-sm  text-white rounded-md font-extrabold 
          hover:bg-white hover:text-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            درباره ما
          </Link>
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
            className=" z-50 absolute top-10 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md
           shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="px-1 py-1 ">
              <Link to="product">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-sky-600 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      قاب موبایل
                    </button>
                  )}
                </Menu.Item>
              </Link>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-sky-600 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    کیس ایرپاد
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
                    بند ساعت
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default NavBar;
