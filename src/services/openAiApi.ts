import axios from "axios";

const baseUrl: string =
  import.meta.env.VITE_APP_BASE_URL ??
  "NOT FOUND CHECK services FOLDER AND .env.local";

export const generateTextWithOpenAI = async (prompt: string) => {
  try {
    // Set the Authorization header
    const config = {
      headers: {
        Authorization: `Bearer YOUR_API_KEY_HERE`,
      },
    };
    const response = await axios.post(
      `${baseUrl}/chatGPT/generate-text`,
      {
        prompt,
      },
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error generating text with OpenAI:", error);
    throw error; // Rethrow the error for handling it in the calling component
  }
};
