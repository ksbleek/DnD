import React, { useState, useEffect } from "react";
import axios from "axios";

function SpellCard({ id, name }) {
  const [spell, setSpell] = useState({
    name: "loading",
    desc: "loading",
    level: 0,
  });
  const [show, setshow] = useState(false);

  const getSpell = async () => {
    const response = await axios.get(
      `https://www.dnd5eapi.co/api/spells/${id}`
    );
    console.log(response.data);
    setSpell(response.data);
  };

  const handleClick = (e) => {
    e.preventDefault();
    getSpell(e.target.id);
    setshow(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setshow(false);
  };

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const showModal = () => {
    setshow(true);
  };

  const hideModal = () => {
    setshow(false);
  };

  return (
    <>
      <div className="SpellCard">
        <h1>{name}</h1>
        <button id={id} onClick={handleClick}>
          More Info
        </button>
      </div>
      <div className={showHideClassName}>
        <section className="modal-main">
          <h2>{spell.name}</h2>
          <p>Level: {spell.level}</p>
          <p>{spell.desc}</p>
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </section>
      </div>
    </>
  );
}

export default SpellCard;
