import { Tab } from "@headlessui/react";
import { useState } from "react";

const HeaderHome = () => {
  return (
    <div className="flex items-center absolute mr-80 top-20 justify-between ">
      {/* SORT TAB SECTION */}
      <Tab.Group className="text-sm ">
        <Tab.List>
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-sky-600 text-white px-4 py-2 rounded-xl transition-all  duration-300 ease-in-out animate-pulse  "
                : " px-4 "
            }
          >
            قاب
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-sky-600 text-white px-4 py-2 rounded-xl transition-all  duration-300 ease-in-out animate-pulse  "
                : "  px-4"
            }
          >
            بند اپل واچ
          </Tab>

          <Tab
            className={({ selected }) =>
              selected
                ? "bg-sky-600 text-white px-4 py-2 rounded-xl transition-all  duration-300 ease-in-out animate-pulse   "
                : "  px-4"
            }
          >
            کیس ایرپاد
          </Tab>
        </Tab.List>
      </Tab.Group>

      
 
    </div>
  );
};

export default HeaderHome;
