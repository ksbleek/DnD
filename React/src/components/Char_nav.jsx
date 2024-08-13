import { useState } from "react";
import { Link } from "react-router-dom";

function Char_Nav() {
  return (
    <nav className="nav container">
      <div className={"char_nav__menu"} id="Char-nav-menu">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="" className="nav__link">
              Race
            </Link>
          </li>
          <li className="nav__item">
            <Link to="class/" className="nav__link">
              Class
            </Link>
          </li>
          <li className="nav__item">
            <Link to="spells/" className="nav__link">
              Spells
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Char_Nav;
