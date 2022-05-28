import { Transition, Tab, Menu } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "@popmotion/popcorn";
import arrow from "../../assets/image/b.png";
import useCollapse from "react-collapsed";
import { useEffect, useState, Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import { useAuthUser, useAuthUserActions } from "../Context/AuthUserProvider";
import { useCart, useCartActions } from "../Context/CartProvider";
import {
  useFavorites,
  useFavoritesActions,
} from "../Context/FavoritesProvider";

export const imagesVertical = [
  "/images/slideimges/vertical/1.jpg",
  "/images/slideimges/vertical/2.jpg",
  "/images/slideimges/vertical/3.png",
  "/images/slideimges/vertical/4.jpg",
  "/images/slideimges/vertical/5.jpg",
  "/images/slideimges/vertical/6.jpg",
];

export const imagesSlide = [
  { img: "/images/slideimges/vertical/4.jpg", title: "لوازم جانبی موبایل" },
  { img: "/images/slideimges/vertical/2.jpg", title: "لوازم جانبی واچ" },
  { img: "/images/slideimges/vertical/1.jpg", title: "لوازم جانبی ایرپاد" },
];

const MainSlider = () => {
  const [position, setPosition] = useState(0);
  const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  useEffect(() => {
    const interval =setTimeout(() => {
      setPosition((prevPosition) =>
        prevPosition == imagesSlide.length - 1 ? 0 : prevPosition + 1
      );
    }, 5000);
    return () => {
      clearInterval(interval)
    }
  }, [position]);
  return (
    <Link to="product" className=" absolute left-0 right-0   ">
      <motion.section className=" flex overflow-hidden  " exit={{ opacity: 0 }}>
        {imagesSlide.map((imgV, index) => {
          return (
            <motion.section
              key={index}
              className=" w-screen"
              initial={{ opacity: 0 }}
              animate={{
                // rotate:10,
                scale: 1,
                opacity: 1,
                scale: index === position ? 1 : 0.8,
              }}
              exit={{ opacity: 0 }}
            >
              <motion.img
                src={imgV.img}
                alt={imgV.title}
                className=" w-screen absolute left-0 right-0"
              />
            </motion.section>
          );
        })}
      </motion.section>

      <motion.section className=" flex overflow-hidden" exit={{ opacity: 0 }}>
        {imagesSlide.map((title, index) => {
          return (
            <motion.section
              key={index}
              className=" w-screen"
              initial={{ opacity: 0 }}
              animate={{
                // rotate:10,
                scale: 1,
                opacity: 1,
                scale: index === position ? 1 : 0.8,
              }}
              exit={{ opacity: 0 }}
            >
              <motion.h1 className="w-1/2 absolute mt-[15%] text-center font-extrabold block  right-0 sm:text-xl md:text-2xl lg:text-3xl">
                {title.title}{" "}
               <section className="">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6  mx-auto animate-pulse sm:text-xl md:text-2xl lg:text-3xl "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
               </section>
              </motion.h1>
            </motion.section>
          );
        })}
      </motion.section>
    </Link>
  );
};

export default MainSlider;
