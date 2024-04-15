import "./App.css";

import Auth from "./pages/auth/Auth";
import HomePage from "./pages/homepage/HomePage";
import Profile from "./pages/profile/Profile";
import { Routes, Route } from "react-router-dom";
import WatchMovie from "./pages/watch/WatchMovie";
import InfoModel from "./components/InfoModel";
import useInfoModel from "./hook/useInfoModel";

function App() {
  const {isOpen , closeModel} = useInfoModel();
  return (
      <Routes>
        <>
          <Route path="/" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <InfoModel visible={isOpen} onClose={closeModel}/>
          <Route path="/home" element={<HomePage />} />
          <Route path="/watchMovie/:id" element={<WatchMovie/>} />
        </>
      </Routes>
  );
}

export default App;
