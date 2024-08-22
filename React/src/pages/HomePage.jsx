import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  getCharacters,
  updateCharacter,
  deleteCharacter,
  getParties,
  addCharacterToParty,
  getUserName,
  capitalizeWords,
} from "../utilities";
import { FaRegPenToSquare } from "react-icons/fa6";
import { imageMappings } from "../utilities";

function HomePage() {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState({});
  const [editingCharacterId, setEditingCharacterId] = useState(null);
  const [newName, setNewName] = useState("");

  // Fetch characters and parties when the component mounts
  useEffect(() => {
    if (user) {
      const fetchCharactersAndParties = async () => {
        try {
          const charactersData = await getCharacters();
          setCharacters(charactersData);
          const partiesData = await getParties();
          setParties(partiesData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchCharactersAndParties();
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  // Handle input change for party name
  const handleInputChange = (e) => {
    setPartyName(e.target.value);
  };

  // Handle edit button click
  const handleEditClick = (id, currentName) => {
    setEditingCharacterId(id);
    setNewName(currentName);
  };

  // Handle name change input
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  // Handle form submission to update character name
  const handleSubmit = async (id) => {
    try {
      await updateCharacter(id, newName);
      setCharacters((prevCharacters) =>
        prevCharacters.map((character) =>
          character.id === id ? { ...character, name: newName } : character
        )
      );
      setEditingCharacterId(null);
      setNewName("");
    } catch (error) {
      console.error("Error updating character:", error);
    }
  };

  // Handle character deletion
  const handleDelete = async (id) => {
    try {
      await deleteCharacter(id);
      setCharacters((prevCharacters) =>
        prevCharacters.filter((character) => character.id !== id)
      );
    } catch (error) {
      console.error("Error deleting character:", error);
    }
  };

  // Handle party selection change
  const handlePartyChange = (characterId, partyId) => {
    setSelectedParty((prevSelectedParty) => ({
      ...prevSelectedParty,
      [characterId]: partyId,
    }));
  };

  // Handle adding character to a party
  const handleAddToParty = async (characterId) => {
    const partyId = selectedParty[characterId];
    if (!partyId) {
      console.error("No party selected");
      return;
    }
    try {
      await addCharacterToParty(partyId, characterId);
    } catch (error) {
      console.error("Error adding character to party:", error);
    }
  };

  // Get the image URL for a given race using util imageMappings
  const getImageForRace = (race) => {
    return imageMappings[race.toLowerCase().replace(" ", "_")] || null;
  };

  return (
    <div>
      <h1>Welcome{user && ` ${getUserName(user)}`}</h1>
      {user ? (
        <div className="Char_list_container">
          {/* Map through characters and display each character card */}
          {characters.map((character) => (
            <div key={character.id} className="character-card">
              {/* Display character image */}
              <img
                src={getImageForRace(character.race_name)}
                alt={character.race_name}
                className="character-image"
              />
              <div className="Char_card_title">
                {/* If editing, show input field and submit button */}
                {editingCharacterId === character.id ? (
                  <>
                    <input
                      type="text"
                      value={newName}
                      onChange={handleNameChange}
                    />
                    <button
                      className="Char_submit_btn"
                      onClick={() => handleSubmit(character.id)}
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <>
                    {/* character name and edit button */}
                    <h2 className="Party_title">
                      {capitalizeWords(character.name)}
                    </h2>
                    <button
                      className="Char_edit_btn"
                      onClick={() =>
                        handleEditClick(character.id, character.name)
                      }
                    >
                      <FaRegPenToSquare />
                    </button>
                  </>
                )}
              </div>
              <p>Race: {character.race_name}</p>
              <p>Class: {character.char_class_name}</p>
              <div>
                <select
                  value={selectedParty[character.id] || ""}
                  onChange={(e) =>
                    handlePartyChange(character.id, e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select a party
                  </option>
                  {parties.map((party) => (
                    <option
                      key={party.id}
                      value={party.id}
                      disabled={party.characters.length >= 4}
                    >
                      {party.name}{" "}
                      {party.characters.length >= 4 ? "(Full)" : ""}
                    </option>
                  ))}
                </select>
                {/* Button to add character to a party */}
                <button
                  className="Char_party_btn"
                  onClick={() => handleAddToParty(character.id)}
                >
                  Add to Party
                </button>
                {/* Button to delete character */}
                <button
                  className="Char_delete_btn"
                  onClick={() => handleDelete(character.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Please log in to view your characters.</p>
      )}
    </div>
  );
}

export default HomePage;
