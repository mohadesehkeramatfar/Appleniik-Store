import { Link, NavLink, useLocation, useParams } from "react-router-dom";

const Aside = () => {
const idParams = useParams()
const id = idParams.id

  return (
    <aside className=" mt-[14%] md:mt-[2%] ">
      <section className="flex border-b-2 pb-2">
        <NavLink
          to={`/${id}/properties`}
          className={(navdata) =>
            navdata.isActive
            ? " border-b-4 px-4 py-2  border-b-pink-600 text-pink-600"
            : "  px-4 py-2 "
          }
        >
          مشخصات کالا
        </NavLink>
        <NavLink
          to="UserComments"
          className={(navdata) =>
            navdata.isActive
              ? " border-b-4 px-4 py-2  border-b-pink-600 text-pink-600"
              : "  px-4 py-2 "
          }
        >
          نظرات کاربران
        </NavLink>
      </section>
     
    </aside>
  );
};

export default Aside;
