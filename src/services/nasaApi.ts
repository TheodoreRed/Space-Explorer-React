import axios from "axios";
import AstronomyPictureOfTheDay from "../models/AstronomyPictureOfTheDay";

const baseUrl: string = "https://api.nasa.gov";
const apiKey: string =
  import.meta.env.VITE_NASA_API_KEY ?? "API KEY NOT FOUND FOR NASA";

export const getAstronomyPictureOfTheDay =
  async (): Promise<AstronomyPictureOfTheDay> => {
    return (await axios.get(`${baseUrl}/planetary/apod?api_key=${apiKey}`))
      .data;
  };
