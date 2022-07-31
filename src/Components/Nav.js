import React from "react";
import { NavLink } from "react-router-dom";

const Nav = (props) => (
  <nav className="main-nav">
    <ul className="main-nav">
      <li>
        <NavLink
          to="/search/basketball"
          onClick={() => {
            props.searchTag("basketball");
            props.setLoading(1);
          }}
        >
          Basketball
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/search/honda"
          onClick={() => {
            props.searchTag("honda");
            props.setLoading(1);
          }}
        >
          Honda
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/search/lion"
          onClick={() => {
            props.searchTag("lion");
            props.setLoading(1);
          }}
        >
          Lion
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;
