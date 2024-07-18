import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Race() {
  const [Race, setRace] = useState([]);

  useEffect(() => {
    const getRace = async () => {
      const response = await axios.get(`https://www.dnd5eapi.co/api/races`);
      console.log(response.data);
      setRace(response.data.results);
    };

    getRace();
  }, []);
  return (
    <>
      <div>
        <h1>Race</h1>
        <div className="tabs">
          <nav className="tab-nav">
            <ul
              className="tab-list"
              role="tablist"
              aria-orientation="horizontal"
            >
              <li className="tab-btn">tab 1</li>
              <li className="tab-btn">tab 2</li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Race;
