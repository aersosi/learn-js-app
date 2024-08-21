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

const NavContent: React.FC<CategoryNavProps> = ({ categories }) => {
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
      {categories.map((category) => (
        <div
          className={`collapse bg-base-200 ${expandedCategory === category.name ? "collapse-open" : ""}`}
          key={category.name}
        >
          <div className="collapse-title peer-checked:bg-secondary peer-checked:text-secondary-content">
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
              <div key={`${category.name}-${subcategory}`}>
                <Link
                  href={`/pages/${category.name}/${subcategory}`}
                  className={`${subcategory === currentSubcategory ? "font-bold" : ""}`}
                >
                  {subcategory}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavContent;
