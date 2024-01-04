import mercuryImage1 from "./assets/mercury/mercury-1.jpg";
import mercuryImage2 from "./assets/mercury/mercury-2.jpg";
import mercuryImage3 from "./assets/mercury/mercury-3.jpg";
import mercuryImage4 from "./assets/mercury/mercury-4.jpg";
import mercuryImage5 from "./assets/mercury/mercury-5.jpg";
import mercuryImage6 from "./assets/mercury/mercury-6.jpg";
import venusImage1 from "./assets/venus/venus-1.jpg";
import venusImage2 from "./assets/venus/venus-2.jpg";
import venusImage3 from "./assets/venus/venus-3.jpg";
import venusImage4 from "./assets/venus/venus-4.jpg";
import venusImage5 from "./assets/venus/venus-5.jpg";
import venusImage6 from "./assets/venus/venus-6.jpg";
import earthImage1 from "./assets/earth/earth-1.jpg";
import earthImage2 from "./assets/earth/earth-2.jpg";
import earthImage3 from "./assets/earth/earth-3.jpg";
import earthImage4 from "./assets/earth/earth-4.jpg";
import earthImage5 from "./assets/earth/earth-5.jpg";
import earthImage6 from "./assets/earth/earth-6.jpg";
import marsImage1 from "./assets/mars/mars-1.jpg";
import marsImage2 from "./assets/mars/mars-2.jpg";
import marsImage3 from "./assets/mars/mars-3.jpg";
import marsImage4 from "./assets/mars/mars-4.jpg";
import marsImage5 from "./assets/mars/mars-5.jpg";
import marsImage6 from "./assets/mars/mars-6.jpg";
import jupiterImage1 from "./assets/jupiter/jupiter-1.jpg";
import jupiterImage2 from "./assets/jupiter/jupiter-2.jpg";
import jupiterImage3 from "./assets/jupiter/jupiter-3.jpg";
import jupiterImage4 from "./assets/jupiter/jupiter-4.jpg";
import jupiterImage5 from "./assets/jupiter/jupiter-5.jpg";
import jupiterImage6 from "./assets/jupiter/jupiter-6.jpg";
import saturnImage1 from "./assets/saturn/saturn-1.jpg";
import saturnImage2 from "./assets/saturn/saturn-2.jpg";
import saturnImage3 from "./assets/saturn/saturn-3.jpg";
import saturnImage4 from "./assets/saturn/saturn-4.jpg";
import saturnImage5 from "./assets/saturn/saturn-5.jpg";
import saturnImage6 from "./assets/saturn/saturn-6.jpg";
// Import statements for Uranus images
import uranusImage1 from "./assets/uranus/uranus-1.jpg";
import uranusImage2 from "./assets/uranus/uranus-2.jpg";
/* import uranusImage3 from "./assets/uranus/uranus-3.jpg";
 */ import uranusImage4 from "./assets/uranus/uranus-4.jpg";
/* import uranusImage5 from "./assets/uranus/uranus-5.jpg";
 */ import uranusImage6 from "./assets/uranus/uranus-6.jpg";

// Import statements for Neptune images
import neptuneImage1 from "./assets/neptune/neptune-1.jpg";
import neptuneImage2 from "./assets/neptune/neptune-2.jpg";
import neptuneImage3 from "./assets/neptune/neptune-3.jpg";
import neptuneImage4 from "./assets/neptune/neptune-4.jpg";
import neptuneImage5 from "./assets/neptune/neptune-5.jpg";
import neptuneImage6 from "./assets/neptune/neptune-6.jpg";

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
  images: [
    mercuryImage1,
    mercuryImage2,
    mercuryImage3,
    mercuryImage4,
    mercuryImage5,
    mercuryImage6,
  ],
  composition: [],
  knownFor: [
    "Being the closest planet to the Sun",
    "Having no moons",
    "Shortest year of all the planets in our solar system (88 days)",
  ],
  keywords: [
    "Mercury",
    "Messenger Mission",
    "Mercury Geology",
    "BepiColombo Mission",
    "Mercury Craters",
  ],
};

const venus: PlanetObj = {
  name: "Venus",
  diameter: 12104,
  mass: 4.8675e24,
  density: 5243,
  gravity: 8.87,
  rotationPeriod: -5832.5,
  lengthOfDay: 2802,
  distanceFromSun: 108210000,
  orbitalPeriod: 224.701,
  averageTemperature: 464,
  numberOfMoons: 0,
  moons: [],
  hasMagneticField: false,
  discoveredBy: "Unknown",
  discoveryYear: "Prehistoric",
  description:
    "Venus is the second planet from the Sun and Earth's closest planetary neighbor. It's known as Earth's 'sister planet' due to their similar size, composition, and proximity to the Sun. Venus has a dense, toxic atmosphere with clouds of sulfuric acid and experiences extreme greenhouse effects.",
  images: [
    venusImage1,
    venusImage2,
    venusImage3,
    venusImage4,
    venusImage5,
    venusImage6,
  ],
  composition: [
    { gasName: "Carbon Dioxide", percentage: 96.5 },
    { gasName: "Nitrogen", percentage: 3.5 },
    { gasName: "Sulfur Dioxide", percentage: 0.015 },
    { gasName: "Carbon Monoxide", percentage: 0.002 },
    { gasName: "Argon", percentage: 0.007 },
    { gasName: "Water Vapor", percentage: 0.003 },
    { gasName: "Helium", percentage: 0.0012 },
  ],
  knownFor: [
    "Hottest planet in our solar system",
    "Known as the 'Morning Star' and 'Evening Star'",
    "Thick, toxic atmosphere with clouds of sulfuric acid",
  ],
  keywords: [
    "Venus",
    "Venus Atmosphere",
    "Venus Surface",
    "Venus Exploration",
    "Venus Volcanoes",
  ],
};

const earth: PlanetObj = {
  name: "Earth",
  diameter: 12756,
  mass: 5.97e24,
  density: 5514,
  gravity: 9.8,
  rotationPeriod: 23.9,
  lengthOfDay: 24,
  distanceFromSun: 149600000,
  orbitalPeriod: 365.2,
  averageTemperature: 15,
  numberOfMoons: 1,
  moons: ["Moon"],
  hasMagneticField: true,
  discoveredBy: "Ancient civilizations",
  discoveryYear: "Prehistoric",
  description:
    "Earth is the third planet from the Sun and the only known place inhabited by living things. It's the largest of the four rocky planets and the only one with liquid water on the surface. Earth is unique for its diverse life forms and is the only known planet to support life.",
  images: [
    earthImage1,
    earthImage2,
    earthImage3,
    earthImage4,
    earthImage5,
    earthImage6,
  ],
  composition: [
    { gasName: "Nitrogen", percentage: 78.08 },
    { gasName: "Oxygen", percentage: 20.95 },
    { gasName: "Argon", percentage: 0.93 },
    { gasName: "Carbon Dioxide", percentage: 0.0417 },
    { gasName: "Neon", percentage: 0.001818 },
    { gasName: "Helium", percentage: 0.000524 },
    { gasName: "Methane", percentage: 0.000187 },
    { gasName: "Krypton", percentage: 0.000114 },
  ],
  knownFor: [
    "Only planet known to support life",
    "Presence of liquid water",
    "Diverse ecosystems and life forms",
  ],
  keywords: [
    "Earth",
    "Blue Planet",
    "Life",
    "Water",
    "Environment",
    "Humanity",
  ],
};

const mars: PlanetObj = {
  name: "Mars",
  diameter: 6779, // in kilometers
  mass: 6.4171e23, // in kilograms
  density: 3933, // in kg/m^3
  gravity: 3.711, // in m/s^2
  rotationPeriod: 24.6, // in hours
  lengthOfDay: 24.7, // in hours
  distanceFromSun: 227943824, // in kilometers
  orbitalPeriod: 687, // in Earth days
  averageTemperature: -63, // in Celsius
  numberOfMoons: 2, // Phobos and Deimos
  moons: ["Phobos", "Deimos"],
  hasMagneticField: false,
  discoveredBy: "Known by ancient astronomers",
  discoveryYear: "Prehistoric",
  description:
    "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System after Mercury. Named after the Roman god of war, it is often referred to as the 'Red Planet' because its iron-rich dust gives it a reddish appearance. Mars is a terrestrial planet with a thin atmosphere, having surface features both like the Moon and the Earth.",
  images: [
    marsImage1,
    marsImage2,
    marsImage3,
    marsImage4,
    marsImage5,
    marsImage6,
  ],
  composition: [
    { gasName: "Carbon Dioxide", percentage: 95.32 },
    { gasName: "Nitrogen", percentage: 2.7 },
    { gasName: "Argon", percentage: 1.6 },
    { gasName: "Oxygen", percentage: 0.13 },
    { gasName: "Carbon Monoxide", percentage: 0.0747 },
    { gasName: "Water Vapor", percentage: 0.03 },
  ],

  knownFor: [
    "Known as the Red Planet",
    "Home to the highest mountain in the solar system, Olympus Mons",
    "Has the largest dust storms in the solar system",
  ],
  keywords: [
    "Mars",
    "Red Planet",
    "Olympus Mons",
    "Martian Moons",
    "Mars Rovers",
  ],
};

const jupiter: PlanetObj = {
  name: "Jupiter",
  diameter: 139820, // in kilometers
  mass: 1.898e27, // in kilograms
  density: 1326, // in kg/m^3
  gravity: 24.79, // in m/s^2
  rotationPeriod: 9.925, // in hours (Jovian day)
  lengthOfDay: 9.925, // in hours
  distanceFromSun: 778500000, // in kilometers
  orbitalPeriod: 4333, // in Earth days (Jovian year)
  averageTemperature: -145, // in Celsius
  numberOfMoons: 79, // as of latest data
  moons: ["Io", "Europa", "Ganymede", "Callisto"], // Add more moons if needed
  hasMagneticField: true,
  discoveredBy: "Known by ancient astronomers",
  discoveryYear: "Prehistoric",
  description:
    "Jupiter is the largest planet in our solar system, more than twice as massive as all other planets combined. It is a gas giant with no solid surface and is mostly made of hydrogen and helium. Jupiter is known for its strong magnetic field, spectacular aurorae, and the Great Red Spot, a gigantic storm larger than Earth.",
  images: [
    jupiterImage1,
    jupiterImage2,
    jupiterImage3,
    jupiterImage4,
    jupiterImage5,
    jupiterImage6,
  ],
  composition: [
    { gasName: "Hydrogen", percentage: 89.8 }, // Majority of Jupiter's atmosphere
    { gasName: "Helium", percentage: 10.2 }, // Second most abundant component
    { gasName: "Methane", percentage: 0.3 },
    { gasName: "Ammonia", percentage: 0.026 },
    { gasName: "Hydrogen Deuteride", percentage: 0.003 },
  ],
  knownFor: [
    "Largest planet in our solar system",
    "Great Red Spot, a massive storm larger than Earth",
    "Strong magnetic field, the most powerful in the solar system",
    "Rapid rotation leading to a short day of about 10 hours",
    "Has a faint ring system discovered by Voyager mission in 1979",
    "Jupiter's moons, especially the Galilean moons - Io, Europa, Ganymede, and Callisto",
    "Possibility of sub-surface oceans on some of its moons",
  ],
  keywords: [
    "Jupiter",
    "Gas Giant",
    "Great Red Spot",
    "Jovian Moons",
    "Galilean Satellites",
    "Jupiter's Rings",
    "Juno Spacecraft",
    "Jovian Magnetosphere",
    "Aurorae on Jupiter",
    "Largest planet",
  ],
};

const saturn: PlanetObj = {
  name: "Saturn",
  diameter: 116460, // Mean diameter in kilometers
  mass: 5.6834e26, // in kilograms
  density: 0.687, // in g/cm³
  gravity: 10.44, // in m/s²
  rotationPeriod: 10.5433, // in hours
  lengthOfDay: 10.66, // in hours
  distanceFromSun: 1430000000,
  orbitalPeriod: 10755.7, // in Earth days
  averageTemperature: -139, // in Celsius, approximate
  numberOfMoons: 146, // including moonlets in the rings
  moons: ["Titan", "Rhea", "Iapetus", "Dione", "Tethys", "Enceladus", "Mimas"],
  hasMagneticField: true,
  discoveredBy: "Known by ancient astronomers",
  discoveryYear: "Prehistoric",
  description:
    "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine-and-a-half times that of Earth. Saturn is known for its prominent ring system, composed mainly of ice particles, with a smaller amount of rocky debris and dust.",
  images: [
    saturnImage1,
    saturnImage2,
    saturnImage3,
    saturnImage4,
    saturnImage5,
    saturnImage6,
  ],
  composition: [
    { gasName: "Hydrogen", percentage: 96.3 },
    { gasName: "Helium", percentage: 3.25 },
    { gasName: "Methane", percentage: 0.45 },
    { gasName: "Ammonia", percentage: 0.0125 },
    { gasName: "Hydrogen Deuteride", percentage: 0.011 },
    { gasName: "Ethane", percentage: 0.0007 },
  ],
  knownFor: [
    "Its prominent ring system",
    "Having at least 146 moons",
    "Largest moon Titan, which is larger than Mercury",
    // Add more notable features
  ],
  keywords: [
    "Saturn",
    "Gas Giant",
    "Rings of Saturn",
    "Saturnian Moons",
    "Titan",
    "Rhea",
    "Iapetus",
    "Dione",
    "Tethys",
    "Enceladus",
    "Mimas",
    // More keywords
  ],
};

const uranus: PlanetObj = {
  name: "Uranus",
  diameter: 50724, // Equatorial diameter in kilometers
  mass: 8.681e25, // in kilograms
  density: 1.27, // in g/cm³
  gravity: 8.69, // in m/s²
  rotationPeriod: 17.24, // in hours (retrograde rotation)
  lengthOfDay: 17.24, // in hours
  distanceFromSun: 2870000000,
  orbitalPeriod: 30688.5, // in Earth days
  averageTemperature: -224, // in Celsius, approximate
  numberOfMoons: 27, // as of latest data
  moons: ["Miranda", "Ariel", "Umbriel", "Titania", "Oberon"], // Add more moons if needed
  hasMagneticField: true,
  discoveredBy: "William Herschel",
  discoveryYear: "1781",
  description:
    "Uranus is the seventh planet from the Sun and has the third-largest diameter in the Solar System. It is an ice giant with a blue-green color due to the methane in its atmosphere. Uranus has a unique sideways rotation and is known for its faint ring system.",
  images: [uranusImage1, uranusImage2, uranusImage4, uranusImage6],
  composition: [
    { gasName: "Hydrogen", percentage: 83 },
    { gasName: "Helium", percentage: 15 },
    { gasName: "Methane", percentage: 2.3 },
    { gasName: "Hydrogen Deuteride", percentage: 0.009 },
    // Add icy volatiles like ammonia, water ice, ammonium hydrosulfide, methane hydrate as needed
  ],
  knownFor: [
    "Unique sideways rotation",
    "Faint ring system",
    "Blue-green color due to methane",
    // Add more notable features
  ],
  keywords: [
    "Uranus",
    "Ice Giant",
    "Sideways Rotation",
    "Uranian Moons",
    "Ring System",
    // More keywords
  ],
};

const neptune: PlanetObj = {
  name: "Neptune",
  diameter: 49528, // Equatorial diameter in kilometers
  mass: 1.02413e26, // in kilograms
  density: 1.638, // in g/cm³
  gravity: 11.15, // in m/s²
  rotationPeriod: 16.11, // in hours
  lengthOfDay: 16.11, // in hours
  distanceFromSun: 4498396000, // Mean distance in kilometers
  orbitalPeriod: 60190, // in Earth days
  averageTemperature: -214, // in Celsius, approximate
  numberOfMoons: 14, // as of latest data
  moons: ["Triton", "Nereid", "Proteus", "Larissa", "Galatea", "Despina"], // Add more moons if needed
  hasMagneticField: true,
  discoveredBy: "Johann Gottfried Galle",
  discoveryYear: "1846",
  description:
    "Neptune is the eighth and farthest planet from the Sun in our Solar System. It is the fourth-largest planet by diameter and the third-most-massive planet. Known for its deep blue color, Neptune was the first planet located through mathematical predictions rather than through regular telescopic observation. Despite being smaller in size, Neptune is denser and more massive than Uranus and has a greater internal energy source.",
  images: [
    neptuneImage1,
    neptuneImage2,
    neptuneImage3,
    neptuneImage4,
    neptuneImage5,
    neptuneImage6,
  ],
  composition: [
    { gasName: "Hydrogen", percentage: 80 },
    { gasName: "Helium", percentage: 19 },
    { gasName: "Methane", percentage: 1.5 },
    { gasName: "Hydrogen Deuteride", percentage: 0.019 },
    { gasName: "Ethane", percentage: 0.00015 },
    // Add icy volatiles like ammonia, water ice, ammonium hydrosulfide, methane ice as needed
  ],
  knownFor: [
    "Farthest planet from the Sun",
    "Deep blue color",
    "Strong winds and storms",
    // Add more notable features
  ],
  keywords: [
    "Neptune",
    "Gas Giant",
    "Blue Planet",
    "Neptunian Moons",
    "Voyager 2 Flyby",
    // More keywords
  ],
};

export const planets: PlanetObj[] = [
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
];
