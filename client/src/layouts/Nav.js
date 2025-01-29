import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <Link to={"/"}>Home</Link>
      </ul>
      <ul>
        <Link to={"/"}>Home</Link>
      </ul>
      <ul>
        <Link>Home</Link>
      </ul>
    </nav>
  );
};

export default Nav;
