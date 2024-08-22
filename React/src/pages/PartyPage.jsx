import React, { useState, useEffect } from "react";
import {
  getParties,
  createParty,
  removeCharacterFromParty,
  updateParty,
  deleteParty,
  getUserName,
  capitalizeWords,
} from "../utilities";
import { FaRegPenToSquare } from "react-icons/fa6";
import { imageMappings } from "../utilities";
import { useOutletContext } from "react-router-dom";

function PartyPage() {
  const [parties, setParties] = useState([]);
  const [partyName, setPartyName] = useState("");
  const [message, setMessage] = useState("");
  const [editingPartyId, setEditingPartyId] = useState(null);
  const [newPartyName, setNewPartyName] = useState("");
  const { user } = useOutletContext();

  useEffect(() => {
    fetchParties();
  }, []);

  // Fetch parties from the server
  const fetchParties = async () => {
    try {
      const data = await getParties();
      setParties(data);
    } catch (error) {
      console.error("Error fetching parties:", error);
    }
  };

  // Handle input change for party name
  const handleInputChange = (e) => {
    setPartyName(e.target.value);
  };

  // Handle form submission to create a new party
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newParty = await createParty(partyName);
      setMessage(`Party "${newParty.name}" created successfully!`);
      setPartyName(""); // Clear the input field
      fetchParties(); // Refresh the list of parties
    } catch (error) {
      setMessage("Error creating party. Please try again.");
    }
  };

  // Handle removing a character from a party
  const handleRemoveCharacter = async (partyId, characterId) => {
    try {
      await removeCharacterFromParty(partyId, characterId);
      fetchParties(); // Refresh the list of parties
    } catch (error) {
      console.error("Error removing character from party:", error);
    }
  };

  // Handle edit button click
  const handleEditClick = (partyId, currentName) => {
    setEditingPartyId(partyId);
    setNewPartyName(currentName);
  };

  // Handle name change input
  const handleNameChange = (e) => {
    setNewPartyName(e.target.value);
  };

  // Handle form submission to update party name
  const handleUpdateSubmit = async (e, partyId) => {
    e.preventDefault();
    try {
      await updateParty(partyId, { name: newPartyName });
      setEditingPartyId(null);
      setNewPartyName("");
      fetchParties(); // Refresh the list of parties
    } catch (error) {
      console.error("Error updating party name:", error);
    }
  };

  // Handle deleting a party
  const handleDeleteParty = async (partyId) => {
    try {
      await deleteParty(partyId);
      fetchParties(); // Refresh the list of parties
    } catch (error) {
      console.error("Error deleting party:", error);
    }
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
    <div>
      {/* Section to create a new party */}
      <div className="add_new_party">
        <h4>Create a New Party</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={partyName}
            onChange={handleInputChange}
            placeholder="Enter party name"
            required
          />
          <button type="submit">Create Party</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      {/* Display parties */}
      <h2>{user && ` ${getUserName(user)}`}'s Parties</h2>
      <div className="Party_list_container">
        {parties.map((party) => (
          <div key={party.id} className="Party_card">
            {/* If editing, show input field and update button */}
            {editingPartyId === party.id ? (
              <form onSubmit={(e) => handleUpdateSubmit(e, party.id)}>
                <input
                  type="text"
                  value={newPartyName}
                  onChange={handleNameChange}
                  placeholder="Enter new party name"
                  required
                />
                <button type="submit">Update</button>
              </form>
            ) : (
              <div className="Party_title_display">
                <h2 className="Party_title">{capitalizeWords(party.name)}</h2>
                <button
                  className="Party_edit_button"
                  onClick={() => handleEditClick(party.id, party.name)}
                >
                  <FaRegPenToSquare />
                </button>
              </div>
            )}
            {/* Display characters in the party */}
            {party.characters.length > 0 ? (
              <div className="Party_Char_container">
                {party.characters.map((character) => (
                  <div key={character.id} className="Char_card">
                    <img
                      src={getImageForRace(character.race_name)}
                      alt={character.race_name}
                      className="character-thumbnail"
                    />
                    <h3 className="Party_title">
                      {capitalizeWords(character.name)}
                    </h3>
                    <p>Race: {character.race_name}</p>
                    <p>Class: {character.char_class_name}</p>
                    <button
                      onClick={() =>
                        handleRemoveCharacter(party.id, character.id)
                      }
                    >
                      Remove Character
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No characters in this party.</p>
            )}
            <button
              className="Party_delete_button"
              onClick={() => handleDeleteParty(party.id)}
            >
              Delete Party
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartyPage;
