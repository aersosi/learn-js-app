import React from "react";
import { FiMenu } from "react-icons/fi";
import ThemeSwitch from "@/app/components/ThemeSwitch";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const Header = ({ params, pathname = "" }) => {
  return (
    <header className="sticky top-0 z-10 flex flex-col gap-4 bg-base-100 py-7">
      <div className="-mx-3 flex items-center justify-between gap-4 lg:ml-0">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-circle btn-ghost mr-4 lg:hidden"
        >
          <FiMenu size={24} />
        </label>

        <h2
          className={`text-2xl font-bold lg:hidden ${params === undefined ? "hidden" : ""}`}
        >
          {params}
        </h2>

        <Breadcrumbs pathname={pathname} />
        <ThemeSwitch />
      </div>

      <h2
        className={`hidden text-2xl font-bold lg:block ${params === undefined ? "hidden" : ""}`}
      >
        {params}
      </h2>
    </header>
  );
};
export default Header;
