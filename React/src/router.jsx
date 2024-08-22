import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
// import AllSpells from "./pages/AllSpells";(future)
import Race from "./pages/Race";
import Character_app from "./pages/Characters";
import CharacterClasses from "./pages/CharClass";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import { userConfirmation } from "./utilities";
import PartyPage from "./pages/PartyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userConfirmation,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "signup/",
        element: <SignUp />,
      },
      {
        path: "login/",
        element: <LogIn />,
      },
      {
        path: "party/",
        element: <PartyPage />,
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
