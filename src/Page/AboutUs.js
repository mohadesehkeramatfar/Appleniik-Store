import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "../component/SearchSort/Search";

const AboutUs = () => {

function max(x,y){
  if(x>y) console.log(x)
  else console.log(y)
}
max(3,5)


  return (
    <div className=" container  absolute top-24 left-0 right-0 ">
      <SearchBox />
      <h1 className=" mt-14 mx-auto  text-center">AboutUs Page</h1>
    </div>
  );
};

export default AboutUs;
