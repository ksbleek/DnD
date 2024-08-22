import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(useLoaderData());
  const navigate = useNavigate();

  useEffect(() => {
    let nullUserUrls = ["/login/", "/signup/"];
    let isAllowed = nullUserUrls.includes(location.pathname);
    if (user && isAllowed) {
      navigate("/");
    } else if (!user && !isAllowed) {
      navigate("/");
    }
  }, [location.pathname, user]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
