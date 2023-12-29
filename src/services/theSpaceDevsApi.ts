import axios from "axios";
import SpaceEvent from "../models/SpaceEvent";
import { Astronaut } from "../models/Astronaut";

const baseUrl: string = import.meta.env.VITE_APP_BASE_URL ?? "NOT FOUND";

export const getAllSpaceEvents = async (): Promise<SpaceEvent[]> => {
  return (await axios.get(`${baseUrl}/space-events`)).data;
};

export const getSpaceEventById = async (id: string): Promise<SpaceEvent> => {
  return (await axios.get(`${baseUrl}/space-events/${encodeURIComponent(id)}`))
    .data;
};

// Toggle a user's interest in a space event
export const toggleSpaceEventInterest = async (
  eventId: string,
  userId: string
): Promise<void> => {
  await axios.patch(
    `${baseUrl}/space-events/${encodeURIComponent(
      eventId
    )}/toggle-interest/${encodeURIComponent(userId)}`
  );
};

export const getAllAstronauts = async (): Promise<Astronaut[]> => {
  const response = await axios.get(`${baseUrl}/astronauts`);
  return response.data;
};

export const getAstronautById = async (id: string): Promise<Astronaut> => {
  return (await axios.get(`${baseUrl}/astronauts/${encodeURIComponent(id)}`))
    .data;
};
