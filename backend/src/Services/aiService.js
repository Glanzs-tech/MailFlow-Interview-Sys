import axios from "axios";

const A4F_API_URL = "https://api.a4f.co/v1/ai/chat";
const A4F_API_KEY = process.env.A4F_API_KEY; // Add this to .env

export async function getAIResponse(message) {
  try {
    const response = await axios.post(
      A4F_API_URL,
      { message },
      {
        headers: {
          "Authorization": `Bearer ${A4F_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ A4F Error:", error.response?.data || error.message);
    throw error;
  }
}
