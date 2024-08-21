"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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

  const currentCategory = pathname.split("/")[2];
  const currentSubcategory = pathname.split("/")[3];

  useEffect(() => {
    if (currentCategory) {
      setExpandedCategory(currentCategory);
    }
  }, [pathname, currentCategory]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory(
      expandedCategory === categoryName ? null : categoryName
    );
  };

  return (
    <>
      <div className="p-4">
        <Link href={`/`} className={`cursor-pointer`}>
          Home
        </Link>
      </div>
      {categories.map((category) => (
        <div
          className={`collapse bg-base-200 ${expandedCategory === category.name ? "collapse-open" : ""}`}
          key={category.name}
        >
          <div className="collapse-title min-h-12 px-4 pb-0 peer-checked:bg-secondary peer-checked:text-secondary-content">
            <div className="flex justify-between gap-4">
              <Link
                href={`/pages/${category.name}`}
                className={`${category.name === currentCategory ? "font-bold" : ""} cursor-pointer`}
              >
                {category.name}
              </Link>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  toggleCategory(category.name);
                }}
                className="cursor-pointer"
              >
                {expandedCategory === category.name ? "Close" : "Open"}
              </div>
            </div>
          </div>
          <div className="collapse-content peer-checked:bg-secondary peer-checked:text-secondary-content">
            {category.subcategories.map((subcategory) => (
              <ul
                key={`${category.name}-${subcategory}`}
                className="menu menu-md p-0"
              >
                <li>
                  <Link
                    href={`/pages/${category.name}#${subcategory}`}
                    className={`${subcategory === currentSubcategory ? "font-bold" : ""}`}
                  >
                    {subcategory}
                  </Link>
                </li>
              </ul>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavDrawerContent;
