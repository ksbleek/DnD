import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCharacter } from "../utilities";

function New_Char({ race, char_class }) {
  const [name, setName] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCharacter(name, race, char_class);
      navigate("/"); // Navigate to the homepage
    } catch (error) {
      console.error("Error creating character:", error);
    }
  };

  return (
    <div className="new-char-container">
      <form onSubmit={handleSubmit} className="new-char-form">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <p>Race: {race && `${race}`}</p>
        <p>Class: {char_class && `${char_class}`}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default New_Char;
