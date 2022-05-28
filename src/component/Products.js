import ProductGaurd from "../Page/ProductGaurd";
import RangeSlider from "./SearchSort/RangeSlider";
import SearchBox from "./SearchSort/Search";

import Sort from "./SearchSort/Sort";

const Products = () => {
  return (
    <div className=" absolute top-24 container xl:max-w-screen-xl left-0 right-0  ">
       <section className=" ">
          <SearchBox />
        </section>
      <section className=" mt-5  grid grid-cols-3 lg:grid-cols-4 w-full  items-center   ">
        <section className=" col-span-1 lg:col-span-2  justify-self-start ">
          <Sort />
        </section>
        <section className=" col-span-1 justify-self-start w-full    ">
          <RangeSlider />
        </section>
       
      </section>

      <section>
        <ProductGaurd />
      </section>
    </div>
  );
};

export default Products;
