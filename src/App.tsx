import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Search from "./components/Search";
import SpaceImageDetails from "./components/SpaceImageDetails";
import Planets from "./components/Planets";
import SpaceEvents from "./components/SpaceEvents";
import SpaceEventDetails from "./components/SpaceEventDetails";
import PastEvents from "./components/PastEvents";
import PlanetDetails from "./components/PlanetDetails";
import Astronauts from "./components/Astronauts";
import AstronautDetails from "./components/AstronautDetails";
import Spacecrafts from "./components/Spacecrafts";
import Profile from "./components/Profile";
import SpacecraftDetails from "./components/SpacecraftDetails";

function App() {
  const { account } = useContext(AuthContext);

  if (account && account.darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/me" element={<Profile />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/search/images/:nasa_id" element={<SpaceImageDetails />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/planets/:planetName" element={<PlanetDetails />} />
        <Route path="/astronauts" element={<Astronauts />} />
        <Route path="/astronauts/:id" element={<AstronautDetails />} />
        <Route path="/spacecrafts" element={<Spacecrafts />} />
        <Route path="/spacecrafts/:id" element={<SpacecraftDetails />} />
        <Route path="/upcoming" element={<SpaceEvents />} />
        <Route path="/upcoming/:id" element={<SpaceEventDetails />} />
        <Route path="/past" element={<PastEvents />} />
        <Route path="/past/:id" element={<SpaceEventDetails isPast={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
