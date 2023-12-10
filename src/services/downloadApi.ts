import axios from "axios";

const baseUrl: string = import.meta.env.VITE_APP_BASE_URL ?? "NOT FOUND";

export const downloadImage = async (imageUrl: string): Promise<Blob | void> => {
  try {
    const response = await axios.get(`${baseUrl}/image/downloadImage`, {
      params: { url: imageUrl },
      responseType: "blob", // Important for handling binary data
    });

    return response.data;
  } catch (err) {
    console.error("Error downloading image:", err);
  }
};
