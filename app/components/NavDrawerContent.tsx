"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Category {
  name: string;
  subcategories: string[];
}

interface CategoryNavProps {
  categories: Category[];
}

const NavDrawerContent: React.FC<CategoryNavProps> = ({ categories }) => {
  const pathname = usePathname();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const pathSegments = pathname.split("/").filter(Boolean);
  const currentCategory = pathSegments[0];
  const currentSubcategory = pathSegments[1]?.split("#")[1];

  useEffect(() => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const category = pathSegments[0];
    if (category) {
      setExpandedCategory(category);
    }
  }, [pathname]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory((prevCategory) =>
      prevCategory === categoryName ? null : categoryName
    );
  };

  return (
    <div key={pathname}>
      <div className="flex flex-col gap-4 p-4">
        <Link href={`/`}>
          <h1 className="text-2xl font-bold">Learn JavaScript</h1>
        </Link>
      </div>
      {categories.map((category) => (
        <div
          className={`collapse ${expandedCategory === category.name ? "collapse-open" : ""}`}
          key={category.name}
        >
          <div className="collapse-title min-h-fit !cursor-auto px-4 py-0 peer-checked:bg-secondary peer-checked:text-secondary-content">
            <div className="flex items-center justify-between gap-4">
              <ul className="menu menu-md p-0">
                <li>
                  <Link
                    href={`/${category.name}`}
                    className={`${category.name === currentCategory ? "font-bold" : ""} cursor-pointer`}
                  >
                    {" "}
                    {category.name}
                  </Link>
                </li>
              </ul>

              <button
                className="btn btn-ghost btn-sm"
                onClick={(e) => {
                  e.preventDefault();
                  toggleCategory(category.name);
                }}
              >
                <FiChevronDown
                  size={18}
                  className={`transform transition ${expandedCategory === category.name ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>
          <div className="collapse-content pb-0 peer-checked:bg-secondary peer-checked:text-secondary-content">
            {category.subcategories.map((subcategory) => (
              <ul
                key={`${category.name}-${subcategory}`}
                className="menu menu-md p-0 pl-4"
              >
                <li>
                  <Link
                    href={`/${category.name}#${subcategory}`}
                    className={`${category.name === currentCategory && subcategory === currentSubcategory ? "font-bold" : ""}`}
                  >
                    {subcategory}
                  </Link>
                </li>
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavDrawerContent;
