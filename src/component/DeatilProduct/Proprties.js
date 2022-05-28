import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useProduct } from "../Context/GurdProductProvider";

const Properties = () => {
  const p = useParams();
  const id = p.id;

  // const product = useProduct();
  // const selectP = product.find((itm) => itm._id === id);
  // const properties = selectP.properties;

  // console.log(properties);

  return (
    <div className=" ">
      <h1>مشخصات کالا میتونه شامل جنس رنگ لوازم همراه باشد!!!!!!!!!!!</h1>
      {/* {properties.map((itm) => {
          
        return itm.accessories.map((item) => <li>{item}</li>);
      })} */}
    </div>
  );
};

export default Properties;
