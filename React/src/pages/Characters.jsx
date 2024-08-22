import { useState, useEffect } from "react";
import Char_Nav from "../components/Char_nav";
import New_Char from "../components/New_char";
import { Outlet } from "react-router-dom";

function Character_app() {
  const [character, setCharacter] = useState({});
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [char_class, setClass] = useState("");

  useEffect(() => {
    console.log(race);
  }, [race]);

  return (
    <>
      <Char_Nav />
      <New_Char race={race} char_class={char_class} />
      <Outlet context={{ setRace, setClass }} />
    </>
  );
}

export default Character_app;
