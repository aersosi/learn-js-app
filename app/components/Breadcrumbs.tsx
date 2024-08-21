import React from "react";
import Link from "next/link";

const generateBreadcrumbs = (pathname) => {
  if (!pathname) return [];
  const paths = pathname.split("/").filter((path) => path);
  return paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join("/")}`;
    return { href, label: path };
  });
};

const Breadcrumbs = ({ pathname }) => {
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <div className="breadcrumbs hidden text-sm lg:block">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href}>
            {index === breadcrumbs.length - 1 ? (
              <span>{crumb.label}</span>
            ) : (
              <Link href={crumb.href}>{crumb.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
