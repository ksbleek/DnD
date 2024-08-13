import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function CharClass() {
  const [charClass, setCharClass] = useState([]);

  useEffect(() => {
    const getCharClass = async () => {
      const response = await axios.get(`https://www.dnd5eapi.co/api/classes`);
      console.log(response.data);
      setCharClass(response.data.results);
    };

    getCharClass();
  }, []);
  return (
    <ul>
      {charClass.map((classes) => (
        <li className="race_list" key={classes.index}>
          {classes.name}
        </li>
      ))}
    </ul>
  );
}

export default CharClass;
