import mercuryImage1 from "./assets/mercury.jpg";
import { PlanetObj } from "./models/Planet";
const mercury: PlanetObj = {
  name: "Mercury",
  diameter: 4879.4,
  mass: 3.3011e23,
  density: 5427,
  gravity: 3.7,
  rotationPeriod: 1407.6,
  lengthOfDay: 4222.6,
  distanceFromSun: 57909227,
  orbitalPeriod: 88,
  averageTemperature: 167,
  numberOfMoons: 0,
  moons: [],
  hasMagneticField: true,
  discoveredBy: "Unknown",
  discoveryYear: "Prehistoric",
  description:
    "Mercury is the smallest planet in our solar system and nearest to the Sun. It is only slightly larger than Earth's Moon and its surface is covered in impact craters.",
  images: [mercuryImage1],
  composition: [],
  knownFor: [
    "Being the closest planet to the Sun",
    "Having no moons",
    "Shortest year of all the planets in our solar system (88 days)",
  ],
};

export const planets: PlanetObj[] = [mercury];
