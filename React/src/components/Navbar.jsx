import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { userLogOut } from "../utilities";

function Navbar({ user, setUser }) {
  return (
    <nav className="nav container">
      <h1>DnD</h1>
      <div className="nav__menu" id="nav-menu">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link to="new_characters/" className="nav__link">
              Create Character
            </Link>
          </li>
          <li>
            <Link to="party/" className="nav__link">
              Party
            </Link>
          </li>
        </ul>
      </div>
      {!user ? (
        <div className="user_nav">
          <ul>
            <li className="nav__item">
              <Link to="signup/" className="nav__link">
                Signup
              </Link>
            </li>
            <li className="nav__item">
              <Link to="login/" className="nav__link">
                Log In
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <button onClick={async () => setUser(await userLogOut())}>
          Log Out
        </button>
      )}
    </nav>
  );
}

export default Navbar;
