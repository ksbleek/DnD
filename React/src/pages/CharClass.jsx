import React, { useState, useEffect } from "react";
import axios from "axios";

function CharacterClasses() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
  const [selectedClass2, setSelectedClass2] = useState({});
  const [classId, setClassId] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("https://www.dnd5eapi.co/api/classes");
        setClasses(response.data.results); // Adjust according to the actual data structure
      } catch (error) {
        console.error("Failed to fetch character classes:", error);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchClassDetails = async () => {
      if (!classId) return;
      try {
        const response = await axios.get(
          `https://api.open5e.com/classes/${classId}`
        );
        setSelectedClass(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch class details:", error);
      }
    };

    fetchClassDetails();
  }, [classId]);

  useEffect(() => {
    const fetchClassDetails2 = async () => {
      if (!classId) return;
      try {
        const response = await axios.get(
          `https://www.dnd5eapi.co/api/classes/${classId}`
        );
        setSelectedClass2(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch class details:", error);
      }
    };

    fetchClassDetails2();
  }, [classId]);

  const handleClick = (id) => {
    setClassId(id);
  };
  return (
    <div className="create_page_container">
      <div className="race_list_container">
        {classes.map((classItem) => (
          <button
            className="race_list"
            id={classItem.index} // Adjust according to the actual data structure
            onClick={() => handleClick(classItem.index)} // Adjust according to the actual data structure
            key={classItem.index} // Adjust according to the actual data structure
          >
            {classItem.name}
          </button>
        ))}
      </div>
      <div className="col-2">
        {selectedClass.name && (
          <div>
            <h2 className="class-title">{selectedClass.name}</h2>
            <p>Health: {selectedClass.hit_dice}</p>
            <p>Armor Proficiency: {selectedClass.prof_armor}</p>
            <p>Saving Throws: {selectedClass.prof_saving_throws}</p>
            <p>
              Starting Equipment:<br></br>
              <ul>
                {selectedClass2.starting_equipment.map((item) => (
                  <li key={item.equipment.index}>
                    {item.equipment.name}
                    <br></br>Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </p>
            <p className="desc-container">
              Description: {selectedClass.desc.replace(/#/g, "")}
            </p>
            {/* Add more details as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default CharacterClasses;
