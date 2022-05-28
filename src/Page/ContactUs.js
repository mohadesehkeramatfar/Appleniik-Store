import ReactMapGL, { Marker, Popup } from "react-map-gl";

import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import SearchBox from "../component/SearchSort/Search";

const ContactUs = () => {
  const [viewport, setViewPort] = useState({
    width: "100vh",
    height: "100vh",
    latitude: 35.69439,
    longitude: 51.42151,
    zoom: 14,
  });

  return (
    <section className=" container h-full absolute top-24 left-0 right-0 ">
      <section className=" ">
        <SearchBox />
      </section>
     
       
      <h1 className=" mt-14 mx-auto  text-center ">تماس با ما</h1>
    </section>
  );
};

export default ContactUs;
