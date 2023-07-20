import { Routes, Route } from "react-router-dom";

import {
  LandingPage,
  PageNotFound,
  LobbyPage,
  GamePage,
  GameHostPage,
} from "./pages";
import Pusher from "pusher-js";
import "./Main.css";

export const pusher = new Pusher("cc7c21ddb57af4f91251", {
  cluster: "eu",
});

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/host" element={<GameHostPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
