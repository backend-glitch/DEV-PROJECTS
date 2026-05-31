import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.API_KEY,
});
export const generateContent = async (req, res) => {
  try {
    const { title, tags, level } = req.body;

    const prompt = `
Create a structured roadmap :

Title: ${title}
Tags: ${tags}
Level: ${level}

IMPORTANT RULES:
- Do NOT use Markdown symbols like **, ##, ###
- Return only normal plain text
- Use simple headings in CAPS or normal words
- Use bullet points with "-" only
- Make it clean and easy to read
- No formatting symbols at all
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;

    return res.json({
      content,
    });

  } catch (error) {
    console.error("GROQ ERROR:", error);
    return res.status(500).json({
      message: "AI generation failed",
      error: error.message,
      
    });
    console.log("GROQ KEY:", process.env.API_KEY);
  }
};

export default generateContent;