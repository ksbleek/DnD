import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h1>DnD</h1>
      <Link to="/">Home</Link>
      <Link to="race/">Race</Link>
      <Link to="class/">Class</Link>
      <Link to="spells/">Spells</Link>
    </nav>
  );
}

export default Navbar;
