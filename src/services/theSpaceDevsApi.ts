import axios from "axios";
import SpaceEvent from "../models/SpaceEvent";

const baseUrl: string = import.meta.env.VITE_APP_BASE_URL ?? "NOT FOUND";

export const getAllUpcomingSpaceEvents = async (): Promise<SpaceEvent[]> => {
  return (await axios.get(`${baseUrl}/space-events`)).data;
};

export const getSpaceEventById = async (id: string): Promise<SpaceEvent> => {
  return (await axios.get(`${baseUrl}/space-events/${encodeURIComponent(id)}`))
    .data;
};
