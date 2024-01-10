import axios from "axios";
import SpaceEvent from "../models/SpaceEvent";
import { Astronaut } from "../models/Astronaut";
import Spacecraft from "../models/Spacecraft";
import { UserComment } from "../models/Account";

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

export const getAllSpacecrafts = async (): Promise<Spacecraft[]> => {
  const response = await axios.get(`${baseUrl}/spacecrafts`);
  return response.data;
};

export const getSpacecraftById = async (id: string): Promise<Spacecraft> => {
  return (await axios.get(`${baseUrl}/spacecrafts/${encodeURIComponent(id)}`))
    .data;
};

// Add a comment to a space event
export const addCommentToSpaceEvent = async (
  eventId: string,
  comment: UserComment
): Promise<void> => {
  try {
    await axios.patch(
      `${baseUrl}/space-events/${encodeURIComponent(eventId)}/add-comment`,
      comment
    );
  } catch (err) {
    console.error("Error adding comment to space event:", err);
  }
};

// Delete a comment from a space event
export const deleteCommentFromSpaceEvent = async (
  eventId: string,
  commentUuid: string
): Promise<void> => {
  try {
    await axios.patch(
      `${baseUrl}/space-events/${encodeURIComponent(eventId)}/delete-comment`,
      { uuid: commentUuid }
    );
  } catch (err) {
    console.error("Error deleting comment from space event:", err);
  }
};

// Toggle like status of a comment in a space event
export const toggleLikeOnComment = async (
  eventId: string,
  userId: string,
  commentUuid: string
): Promise<void> => {
  try {
    await axios.patch(
      `${baseUrl}/space-events/${encodeURIComponent(
        eventId
      )}/toggle-like-comment/${encodeURIComponent(userId)}`,
      { uuid: commentUuid }
    );
  } catch (err) {
    console.error("Error toggling like on comment:", err);
  }
};

// Function to add a reply to a comment in a space event
export const addReplyToSpaceEventComment = async (
  eventId: string,
  commentUuid: string,
  reply: UserComment
): Promise<void> => {
  try {
    await axios.patch(
      `${baseUrl}/space-events/${encodeURIComponent(
        eventId
      )}/comments/${encodeURIComponent(commentUuid)}/add-reply`,
      { reply }
    );
  } catch (err) {
    console.error("Error adding reply to space event comment:", err);
  }
};

// Function to delete a reply from a comment in a space event
export const deleteReplyFromSpaceEventComment = async (
  eventId: string,
  commentUuid: string,
  replyUuid: string
): Promise<void> => {
  try {
    await axios.patch(
      `${baseUrl}/space-events/${encodeURIComponent(
        eventId
      )}/comments/${encodeURIComponent(
        commentUuid
      )}/delete-reply/${encodeURIComponent(replyUuid)}`
    );
  } catch (err) {
    console.error("Error deleting reply from space event comment:", err);
  }
};

// Function to toggle like status of a reply in a space event
export const toggleLikeOnReply = async (
  eventId: string,
  replyUuid: string,
  userId: string
): Promise<void> => {
  try {
    await axios.patch(
      `${baseUrl}/space-events/${encodeURIComponent(
        eventId
      )}/toggle-like-reply/${encodeURIComponent(
        replyUuid
      )}/${encodeURIComponent(userId)}`
    );
  } catch (err) {
    console.error("Error toggling like on reply:", err);
  }
};
