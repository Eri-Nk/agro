import { Link, useLocation } from "react-router-dom";
import React from "react";

const Breadcrumbs = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const breadcrumbItems = paths.map((path, index) => {
    // full path up to the current segment.

    const routeTo = `/${paths.slice(0, index + 1).join("/")}`;
    const isLast = index === paths.length - 1;

    return path === "about" ? (
      <span key={routeTo}>About{" > "}</span>
    ) : isLast ? (
      <span key={routeTo}>
        {capitalizeFirstLetter(path.replace(/-/g, " "))}
      </span>
    ) : (
      <React.Fragment key={routeTo}>
        <Link to={routeTo}>
          {capitalizeFirstLetter(path.replace(/-/g, " "))}
        </Link>
        {">"}
      </React.Fragment>
    );
  });

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      {breadcrumbItems.length > 0 && " > "}
      {breadcrumbItems}
    </nav>
  );
};

export default Breadcrumbs;
