import React, { useState, useEffect } from "react";
import axios from "axios";

function Race() {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState({});
  const [raceId, setRaceId] = useState(null);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await axios.get("https://www.dnd5eapi.co/api/races");
        console.log(response.data);
        setRaces(response.data.results);
      } catch (error) {
        console.error("Failed to fetch races:", error);
      }
    };

    fetchRaces();
  }, []);

  useEffect(() => {
    const fetchRaceDetails = async () => {
      if (!raceId) return;
      try {
        const response = await axios.get(
          `https://www.dnd5eapi.co/api/races/${raceId}`
        );
        console.log(response.data);
        setSelectedRace(response.data);
      } catch (error) {
        console.error("Failed to fetch race details:", error);
      }
    };

    fetchRaceDetails();
  }, [raceId]);

  const handleClick = (id) => {
    console.log(id);
    setRaceId(id);
  };

  return (
    <div className="create_page_container">
      <div className="race_list_container">
        {races.map((race) => (
          <button
            className="race_list"
            id={race.index}
            onClick={() => handleClick(race.index)}
            key={race.index}
          >
            {race.name}
          </button>
        ))}
      </div>
      <div className="col-2">
        {selectedRace.name ? (
          <div>
            <h2>{selectedRace.name}</h2>
            {selectedRace.ability_bonuses.map((ability) => (
              <li key={ability.ability_score.name}>
                {ability.ability_score.name}: {ability.bonus}
              </li>
            ))}
            {selectedRace.ability_bonus_options ? (
              <li>
                <select>
                  {selectedRace.ability_bonus_options.from.options.map(
                    (ability) => (
                      <option
                        key={ability.ability_score.name}
                        value={ability.ability_score.name}
                      >
                        {ability.ability_score.name}: {ability.bonus}
                      </option>
                    )
                  )}
                </select>{" "}
              </li>
            ) : null}
            <p>Age: {selectedRace.age}</p>
            <p>Alignment: {selectedRace.alignment}</p>
            <p>Size: {selectedRace.size_description}</p>
            <p>Languages: {selectedRace.language_desc}</p>
          </div>
        ) : (
          <p>No race selected</p>
        )}
      </div>
    </div>
  );
}

export default Race;
