import axios from "axios";
import half_orc from "./images/half_orc.jpg";
import elf from "./images/elf.jpg";
import dwarf from "./images/dwarf.jpg";
import gnome from "./images/gnome.jpg";
import half_elf from "./images/half_elf.jpg";
import halfling from "./images/halfling.jpg";
import human from "./images/human.jpg";
import tiefling from "./images/tiefling.jpg";
import dragonborn from "./images/dragonborn.jpg";

// USER CRUD

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
});

// sign up

export const userRegistration = async (email, password) => {
  let response = await api.post("users/signup/", {
    email: email,
    password: password,
  });
  if (response.status === 201) {
    let { user, token } = response.data;
    // Store the token securely (e.g., in localStorage or HttpOnly cookies)
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    return user;
  }
  alert(response.data);
  return null;
};

// Login

export const userLogIn = async (email, password) => {
  let response = await api.post("users/login/", {
    email: email,
    password: password,
  });
  if (response.status === 200) {
    let { player, token } = response.data;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    return player;
  }
  alert(response.data);
  return null;
};

// logout

export const userLogOut = async () => {
  try {
    let response = await api.post("users/logout/");
    if (response.status === 204) {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      return null;
    } else {
      alert("Something went wrong and logout failed");
    }
  } catch (error) {
    console.error("Logout failed:", error);
    alert("Something went wrong and logout failed");
  }
};

// Confirm token

export const userConfirmation = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    let response = await api.get("users/");
    if (response.status === 200) {
      return response.data.email;
    }
  }
  return null;
};

// CHARACTER CRUD

// const BASE_URL = "http://localhost:8000/api/v1/characters/";

// Get the token from local storage
// const getToken = () => {
//   return localStorage.getItem("token");
// };

// Set up axios
// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${getToken()}`,
//   },
// });

// Get the list of characters
export const getCharacters = async () => {
  try {
    const response = await api.get("characters/");
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};

// Create a new character
export const createCharacter = async (name, race, char_class) => {
  try {
    // let token = localStorage.getItem("token");
    // api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const response = await api.post("characters/", {
      name: name,
      race: race,
      char_class: char_class,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error creating character:", error);
    throw error;
  }
};

// Get a single character by ID (Future use)
// export const getCharacter = async (id) => {
//   try {
//     let token = localStorage.getItem("token");
//     api.defaults.headers.common["Authorization"] = `Token ${token}`;
//     const response = await api.get(`characters/${id}/`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching character:", error);
//     throw error;
//   }
// };

// Update a character by ID
export const updateCharacter = async (id, name) => {
  try {
    // let token = localStorage.getItem("token");
    // api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const response = await api.put(`characters/${id}/`, { name });
    return response.data;
  } catch (error) {
    console.error("Error updating character:", error);
    throw error;
  }
};

// Delete a character by ID
export const deleteCharacter = async (id) => {
  try {
    // let token = localStorage.getItem("token");
    // api.defaults.headers.common["Authorization"] = `Token ${token}`;
    await api.delete(`characters/${id}/`);
  } catch (error) {
    console.error("Error deleting character:", error);
    throw error;
  }
};

// **PARTY CRUD**

// Create Party

export const createParty = async (name) => {
  try {
    // let token = localStorage.getItem("token");
    // api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const response = await api.post(`party/parties/`, {
      name: name,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating party:", error);
    throw error;
  }
};

// get all parties

export const getParties = async () => {
  try {
    // let token = localStorage.getItem("token");
    // api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const response = await api.get(`party/parties/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching parties:", error);
    throw error;
  }
};

// add to party

export const addCharacterToParty = async (partyId, characterId) => {
  try {
    // let token = localStorage.getItem("token");
    // api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const response = await api.post(`party/parties/${partyId}/add_character/`, {
      character_id: characterId,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error("Party is full:", error.response.data);
    } else {
      console.error("Error adding character to party:", error);
    }
    throw error;
  }
};

// Remove Character from party

export const removeCharacterFromParty = async (partyId, characterId) => {
  try {
    // let token = localStorage.getItem("token");
    // api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const response = await api.post(
      `party/parties/${partyId}/remove_character/`,
      { character_id: characterId }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing character from party:", error);
    throw error;
  }
};

// Update party name

export const updateParty = async (partyId, partyData) => {
  try {
    // let token = localStorage.getItem("token");
    // api.defaults.headers.common["Authorization"] = `Token ${token}`;
    const response = await api.put(`party/parties/${partyId}/`, partyData);
    return response.data;
  } catch (error) {
    console.error("Error updating party:", error);
    throw error;
  }
};

// Delete a party

export const deleteParty = async (partyId) => {
  try {
    // let token = localStorage.getItem("token");
    // api.defaults.headers.common["Authorization"] = `Token ${token}`;
    await api.delete(`party/parties/${partyId}/`);
  } catch (error) {
    console.error("Error deleting party:", error);
    throw error;
  }
};

// Race image

export const imageMappings = {
  half_orc,
  elf,
  dwarf,
  dragonborn,
  gnome,
  half_elf,
  halfling,
  human,
  tiefling,
};

// character utils

export const getUserName = (user) => {
  if (!user) return "";
  return user.split("@")[0];
};

export const capitalizeWords = (str) =>
  str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
