// import { useState } from "react";
// import axios from "axios";

// function SpellModal({ id }) {
//   const [spell, setSpell] = useState(null);

//   useEffect(() => {
//     const getSpell = async () => {
//       const response = await axios.get(
//         `https://www.dnd5eapi.co/api/spells/${id}`
//       );
//       console.log(response.data);
//       setSpell(response.data);
//     };

//     getSpell();
//   }, []);

//   return (
//     <div className={showHideClassName}>
//       <section className="modal-main">
//         <button type="button">Close</button>
//       </section>
//     </div>
//   );
// }

// export default SpellModal;

// future use
