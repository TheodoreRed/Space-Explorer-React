import axios from "axios";
import SpaceEvent from "../models/SpaceEvent";

const baseUrl: string = import.meta.env.VITE_APP_BASE_URL ?? "NOT FOUND";

export const updateDatabase = async (): Promise<void> => {
  try {
    const response = await axios.get(`${baseUrl}/space-events/trigger-update`);
    console.log(response.data); // Or handle the response as needed
  } catch (error) {
    console.error("Error updating database:", error);
  }
};

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
