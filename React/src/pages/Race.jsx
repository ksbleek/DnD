import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Race() {
  const [Races, setRaces] = useState([]);
  const [Race, setRace] = useState({});

  useEffect(() => {
    const getRace = async () => {
      const response = await axios.get(`https://www.dnd5eapi.co/api/races`);
      console.log(response.data);
      setRaces(response.data.results);
    };

    getRace();
  }, []);
  return (
    <div className="create_page_container">
      <div className="race_list_container">
        {Races.map((race) => (
          <button className="race_list" key={race.index}>
            {race.name}
          </button>
        ))}
      </div>
      <div className="col-2">
        <p>dfwrefwref</p>
      </div>
    </div>
  );
}

export default Race;
