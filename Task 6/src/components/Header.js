import React from "react";
import { NavLink } from "react-router-dom";

import { ROUTES } from "../consts";

const links = [
  {
    route: ROUTES.MAIN,
    label: "MAIN PAGE",
  },
  {
    route: ROUTES.EMPLOYEES,
    label: "EMPLOYEES",
  },
];

export const Header = () => {
  const renderLinks = (links) => {
    return links.map(({ route, label }) => {
      return (
        <li>
          <NavLink
            activeStyle={{ textDecoration: "underline" }}
            to={route}
            exact
          >
            <h4>{label}</h4>
          </NavLink>
        </li>
      );
    });
  };

  return (
    <div>
      <ul
        style={{
          width: "17rem",
          listStyleType: "none",
          paddingLeft: "0px",
          marginTop: "2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {renderLinks(links)}
      </ul>
    </div>
  );
};
