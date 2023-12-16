import axios from "axios";

const baseUrl: string =
  import.meta.env.VITE_APP_BASE_URL ??
  "NOT FOUND CHECK services FOLDER AND .env.local";

export const generateTextWithOpenAI = async (prompt: string) => {
  try {
    const response = await axios.post(`${baseUrl}/chatGPT/generate-text`, {
      prompt,
    });
    return response.data; // Assuming the server sends back the generated text as response
  } catch (error) {
    console.error("Error generating text with OpenAI:", error);
    throw error; // Rethrow the error for handling it in the calling component
  }
};
