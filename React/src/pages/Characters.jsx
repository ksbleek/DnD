import { useState } from "react";
import Char_Nav from "../components/Char_nav";
import { Outlet } from "react-router-dom";

function Character_app() {
  return (
    <>
      <Char_Nav />
      <Outlet />
    </>
  );
}

export default Character_app;
