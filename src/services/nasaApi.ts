import axios from "axios";
import AstronomyPictureOfTheDay from "../models/AstronomyPictureOfTheDay";
import NASAImage from "../models/NASAImage";

const baseUrl: string = "https://api.nasa.gov";
const apiKey: string =
  import.meta.env.VITE_NASA_API_KEY ?? "API KEY NOT FOUND FOR NASA";

export const getAstronomyPictureOfTheDay =
  async (): Promise<AstronomyPictureOfTheDay> => {
    return (await axios.get(`${baseUrl}/planetary/apod?api_key=${apiKey}`))
      .data;
  };

export const getNASAImagesBySearch = async (
  search: string
): Promise<NASAImage[]> => {
  return (await axios.get(`https://images-api.nasa.gov/search?q=${search}`))
    .data.collection.items;
};

export const getNASAImagesById = async (id: string): Promise<NASAImage> => {
  return (await axios.get(`https://images-api.nasa.gov/search?q=${id}`)).data
    .collection.items[0];
};
