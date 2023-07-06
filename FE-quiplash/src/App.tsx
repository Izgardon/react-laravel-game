import { Routes, Route } from "react-router-dom";

import { LandingPage, PageNotFound, LobbyPage } from "./pages";
import Pusher from "pusher-js";

export const pusher = new Pusher("cc7c21ddb57af4f91251", {
  cluster: "eu",
});

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
