import "./App.css";

import Auth from "./pages/auth/Auth";
import HomePage from "./pages/homepage/HomePage";
import Profile from "./pages/profile/Profile";
import { Routes, Route } from "react-router-dom";
import WatchMovie from "./pages/watch/WatchMovie";

function App() {
  return (
      <Routes>
        <>
          <Route path="/" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/watchMovie/:id" element={<WatchMovie/>} />
        </>
      </Routes>
  );
}

export default App;
