interface AtmosphereComposition {
  gasName: string;
  percentage: number; // Percent of that gas in atmosphere
}

export interface PlanetObj {
  name: string;
  diameter: number; // in kilometers
  mass: number; // in kilograms
  density: number; // in kg/m^3
  gravity: number; // in m/s^2
  rotationPeriod: number; // in hours
  lengthOfDay: number; // in hours
  distanceFromSun: number; // in kilometers
  orbitalPeriod: number; // in Earth days
  averageTemperature: number; // in Celsius
  numberOfMoons: number;
  moons: string[];
  hasMagneticField: boolean;
  discoveredBy: string;
  discoveryYear: string;
  description: string;
  images: string[];
  composition: AtmosphereComposition[];
  knownFor: string[]; // array of interesting facts or features
  keywords: string[];
}
