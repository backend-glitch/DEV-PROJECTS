import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.API_KEY,
});
export const generateAnswer = async (req, res) => {
  try {
    const { question, language,custom } = req.body;

    const prompt = `You are a BTech CSE student solving a programming assignment.

For the given question:

Question:
${question}

Languages:
${language}

custom instructions :
${custom}

1. Write a clean and correct solution.
2.Use beginner to intermediate concepts only.
3.Prefer loops, arrays, strings, functions, and basic STL.
4.Avoid advanced optimizations, complex data structures, lambdas, templates, bit manipulation, and competitive programming tricks unless absolutely necessary.
5. Write code like a student would submit in a college assignment.
6. Do NOT add comments inside the code, no comments.
7. Keep variable names simple and meaningful.
8. Avoid over-engineering and extremely advanced optimizations.
9. The code should look like it was written by a good college student
10. Return the answer in this format:

Code:
<code>

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

export default generateAnswer;