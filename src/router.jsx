import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import AllSpells from "./pages/AllSpells";
import Race from "./pages/Race";

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
        path: "race/",
        element: <Race />,
      },
      {
        path: "spells/",
        element: <AllSpells />,
      },
    ],
  },
]);

export default router;
