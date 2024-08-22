import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext, useNavigate } from "react-router-dom";
import { imageMappings } from "../utilities";

function Race() {
  const [races, setRaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState({});
  const [raceId, setRaceId] = useState(null);
  const { setRace } = useOutletContext();
  const navigate = useNavigate(); // Initialize useNavigate

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

  // Fetch details of the selected race when raceId changes
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

  // Handle race button click
  const handleClick = (id) => {
    console.log(id);
    setRaceId(id);
  };

  // Handle form submission to select a race
  const handleSubmit = () => {
    setRace(selectedRace.name);
    navigate("class/"); // Navigate to the CharacterClasses component
  };

  // Get the image URL for a given race
  const getImageForRace = (race) => {
    const formattedRace = race
      .toLowerCase()
      .replace(/ /g, "_")
      .replace(/-/g, "_");
    return imageMappings[formattedRace] || null;
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
            <div
              className="race-thumbnail"
              style={{
                backgroundImage: `url(${getImageForRace(selectedRace.name)})`,
              }}
            ></div>
            <ul>
              {selectedRace.ability_bonuses.map((ability) => (
                <li key={ability.ability_score.name}>
                  {ability.ability_score.name}: {ability.bonus}
                </li>
              ))}
              {selectedRace.ability_bonus_options && (
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
                  </select>
                </li>
              )}
            </ul>
            <p>Age: {selectedRace.age}</p>
            <p>Alignment: {selectedRace.alignment}</p>
            <p>Size: {selectedRace.size_description}</p>
            <p>Languages: {selectedRace.language_desc}</p>
            <button onClick={handleSubmit}>Select</button>
          </div>
        ) : (
          <p>No race selected</p>
        )}
      </div>
    </div>
  );
}

export default Race;
