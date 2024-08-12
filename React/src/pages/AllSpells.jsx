import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import SpellCard from "../components/SpellCard";

function AllSpells() {
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    const getSpells = async () => {
      const response = await axios.get(`https://www.dnd5eapi.co/api/spells`);
      console.log(response.data);
      setSpells(response.data.results);
    };

    getSpells();
  }, []);

  // if (spells === null || spells.id === null) {
  //   return <h2>Loading</h2>;
  // }
  console.log(spells);

  return (
    <>
      <h2>All Spells</h2>
      <div className="CardDisplay">
        {spells.map((spell, idx) => (
          <SpellCard
            key={idx}
            id={spell.index}
            name={spell.name}
            level={spells.level}
            url={spells.url}
          />
        ))}
      </div>
    </>
  );
}

export default AllSpells;
