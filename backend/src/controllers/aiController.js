import { OpenAI } from "openai";

const A4F_API_KEY = process.env.A4F_API_KEY;
const A4F_API_BASE_URL = "https://api.a4f.co/v1";
const A4F_MODEL = "provider-1/chatgpt-4o-latest"; // critical!

const openai = new OpenAI({
  apiKey: A4F_API_KEY,
  baseURL: A4F_API_BASE_URL,
});

export const generateEmailContent = async (req, res) => {
  const { prompt } = req.body;

  console.log("🟢 Prompt:", prompt);
  console.log("🟡 A4F_API_KEY exists:", !!A4F_API_KEY);
  console.log("🟠 Using OpenAI SDK with A4F proxy...");

  try {
    const completion = await openai.chat.completions.create({
      model: A4F_MODEL,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const content = completion.choices?.[0]?.message?.content?.trim() || "No response from AI.";
    return res.json({ content });
  } catch (error) {
    console.error("❌ A4F Error:", {
      message: error.message,
      status: error.status,
      cause: error.cause,
    });

    return res.status(500).json({
      error: "AI generation failed",
      details: error.message,
    });
  }
};

export const generateSubject = async (req, res) => {
  const { topic } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: A4F_MODEL,
      messages: [
        {
          role: "system",
          content: "You are an AI specialized in email marketing.",
        },
        {
          role: "user",
          content: `Suggest 5 catchy email subject lines for: ${topic}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const raw = completion.choices?.[0]?.message?.content || "";
    const suggestions = raw
      .trim()
      .split("\n")
      .map((s) => s.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);

    res.json({ suggestions });
  } catch (error) {
    console.error("❌ A4F Error:", {
      message: error.message,
      status: error.status,
      cause: error.cause,
    });

    res.status(500).json({ error: "Subject line generation failed" });
  }
};
