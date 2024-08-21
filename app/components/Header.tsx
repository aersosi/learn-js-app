import React from "react";
import { FiMenu } from "react-icons/fi";
import ThemeSwitch from "@/app/components/ThemeSwitch";

const Header = ({ params }) => {
  return (
    <header className="flex flex-col gap-4 py-7">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="my-drawer-2" className="btn btn-circle mr-4 lg:hidden">
          <FiMenu size={24} />
        </label>

        <h1 className="text-xl font-bold">Learn JavaScript</h1>

        <ThemeSwitch />
      </div>

      <div className="flex items-center justify-between gap-4">
        <h2
          className={`text-2xl font-bold ${params === undefined ? "hidden" : ""}`}
        >
          {params}
        </h2>
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Documents</a>
            </li>
            <li>Add Document</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
