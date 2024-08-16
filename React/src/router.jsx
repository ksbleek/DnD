import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import AllSpells from "./pages/AllSpells";
import Race from "./pages/Race";
import Character_app from "./pages/Characters";
import CharacterClasses from "./pages/CharClass";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "spells/",
        element: <AllSpells />,
      },
      {
        path: "signup/",
        element: <SignUp />,
      },
      {
        path: "new_characters/",
        element: <Character_app />,
        children: [
          {
            index: true,
            element: <Race />,
          },
          {
            path: "class/",
            element: <CharacterClasses />,
          },
        ],
      },
    ],
  },
]);

export default router;
