import axios from "axios";
import Account, { UserComment } from "../models/Account";
import SpaceArticle from "../models/SpaceArticle";
import NASAImage from "../models/NASAImage";

const baseUrl: string =
  import.meta.env.VITE_APP_BASE_URL ?? "NOT FOUND CHECK SERVICES FOLDER";

export const getAccountById = async (uid: string): Promise<Account | void> => {
  try {
    return (await axios.get(`${baseUrl}/accounts/${encodeURIComponent(uid)}`))
      .data;
  } catch (err) {
    console.log(err, "!!!!!!!!!!! ERROR ???????????");
  }
};

export const createNewAccount = async (account: Account): Promise<Account> => {
  return (await axios.post(`${baseUrl}/accounts`, account)).data;
};

export const updateAccountById = async (
  uid: string,
  account: Account
): Promise<Account | void> => {
  try {
    return (
      await axios.put(`${baseUrl}/accounts/${encodeURIComponent(uid)}`, account)
    ).data;
  } catch (err) {
    console.log(err);
  }
};

// Toggle a user's interest in a space article
export const toggleSpaceArticleInterest = async (
  article: SpaceArticle,
  userId: string
): Promise<void> => {
  await axios.patch(
    `${baseUrl}/accounts/${encodeURIComponent(userId)}/toggle-article`,
    article
  );
};

// Toggle a user's interest in a nasa image
export const toggleSpaceImageInterest = async (
  image: NASAImage,
  userId: string
): Promise<void> => {
  await axios.patch(
    `${baseUrl}/accounts/${encodeURIComponent(userId)}/toggle-image`,
    image
  );
};

// Add a comment to an account
export const addCommentToAccount = async (
  accountId: string,
  comment: UserComment
): Promise<void> => {
  try {
    await axios.patch(
      `${baseUrl}/accounts/${encodeURIComponent(accountId)}/add-comment`,
      comment
    );
  } catch (err) {
    console.error("Error adding comment to account:", err);
  }
};

// Function to delete a comment from an account
export const deleteCommentFromAccount = async (
  accountId: string,
  commentUuid: string
): Promise<void> => {
  try {
    await axios.patch(
      `${baseUrl}/accounts/${encodeURIComponent(accountId)}/delete-comment`,
      { uuid: commentUuid }
    );
  } catch (err) {
    console.error("Error deleting comment from account:", err);
  }
};
