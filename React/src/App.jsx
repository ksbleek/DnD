import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Navbar />
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
