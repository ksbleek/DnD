import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function CharClass() {
  const [charClass, setCharClass] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const getCharClass = async () => {
      const response = await axios.get(`https://www.dnd5eapi.co/api/classes`);
      console.log(response.data);
      setCharClass(response.data.results);
    };

    getCharClass();
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
              {charClass.map((charclass, index) => (
                <li
                  key={charclass.name}
                  className="tab-btn"
                  onClick={setActiveTab}
                >
                  {charclass.name}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default CharClass;
