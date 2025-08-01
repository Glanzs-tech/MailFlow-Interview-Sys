import { OpenAI } from "openai";

const A4F_API_BASE_URL = "https://api.a4f.co/v1";
const A4F_MODEL = "provider-3/gpt-4.1-nano"; // critical!

export const generateEmailContent = async (req, res) => {
  const { subject, tone, length, audience, context, signature } = req.body;
  const A4F_API_KEY = process.env.A4F_API_KEY;

  if (!A4F_API_KEY) {
    return res.status(500).json({ error: "Missing A4F API Key" });
  }

  const openai = new OpenAI({
    apiKey: A4F_API_KEY,
    baseURL: A4F_API_BASE_URL,
  });

  const prompt = `Write a professional email body for the subject: "${subject}".
  Avoid including a subject line or greeting like "Hi" or "Dear".
  Tone: ${tone || "neutral"}.
  Audience: ${audience || "general audience"}.
  Context: ${context || "none"}.
  Length: ${length || "medium"}.
  DO NOT include a sign-off or signature; return only the body.`;

  try {
    const completion = await openai.chat.completions.create({
      model: A4F_MODEL,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant specialized in writing professional emails.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const body = completion.choices?.[0]?.message?.content?.trim() || "No response from AI.";

    // Construct final response with custom signature
    const finalEmail = `${body}\n\nBest regards,\n${signature || "[Your Name]\n[Your Position]\n[Your Company]\n[Contact Information]"}`;

    return res.json({ content: finalEmail });
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
  const A4F_API_KEY = process.env.A4F_API_KEY;

  if (!A4F_API_KEY) {
    return res.status(500).json({ error: "Missing A4F API Key" });
  }

  const openai = new OpenAI({
    apiKey: A4F_API_KEY,
    baseURL: A4F_API_BASE_URL,
  });

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
