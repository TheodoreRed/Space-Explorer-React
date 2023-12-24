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
        <Route path="/search" element={<Search />}></Route>
        <Route path="/search/images/:nasa_id" element={<SpaceImageDetails />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/planets/:planetName" element={<PlanetDetails />} />
        <Route path="/upcoming" element={<SpaceEvents />} />
        <Route path="/upcoming/:id" element={<SpaceEventDetails />} />
        <Route path="/past" element={<PastEvents />} />
        <Route path="/past/:id" element={<SpaceEventDetails isPast={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
