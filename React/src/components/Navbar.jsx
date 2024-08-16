import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav container">
      <h1>DnD</h1>
      <div className={"nav__menu"} id="nav-menu">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link to="Characters/" className="nav__link">
              Characters
            </Link>
          </li>
          <li className="nav__item">
            <Link to="new_characters/" className="nav__link">
              Create Character
            </Link>
          </li>
          <li className="nav__item">
            <Link to="spells/" className="nav__link">
              Spells
            </Link>
          </li>
          <li className="nav__item">
            <Link to="signup/" className="nav__link">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
