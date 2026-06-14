import { useState } from "react";
import API from "../connections/axios.js";
import { ExtractQuestions } from "../utils/ExtractQuestions.jsx";
import QuestionsCard from "./QuestionsCard.jsx";
import { useNavigate } from "react-router-dom";



const Upload = () => {

  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLang, setIsLang] = useState("");

  const [answers, setAnswers] = useState({});
  const [loadingAll, setLoadingAll] = useState(false);

  const [isSelected, setIsSelected] = useState(false);

 const custom = isSelected 
  ? "CRITICAL: Provide the correct, functional code execution output for this problem at last .format:  Output <output> " 
  : "CRITICAL: Do NOT provide any code execution output, console simulations, or predicted results. Only provide the code itself.";

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const res = await API.post("/upload", formData);

      const extractedQuestions = ExtractQuestions(
        res.data.data
      );

      setQuestions(extractedQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  const generateSingleAnswer = async (
    question,
    index,
    language,
    custom,
  ) => {
    if (!language) {
      alert("Please select a language first");
      return;
    }

    try {
      const res = await API.post("/ai/generate", {
        question,
        language,
        custom,
      });

      setAnswers((prev) => ({
        ...prev,
        [index]: res.data.content,
      }));

   

    } catch (error) {
      console.log(error);

    }
  };

  const generateAllAnswers = async () => {
    if (!isLang) {
      alert("Please select a language first");
      return;
    }

    try {
      setLoadingAll(true);

      const newAnswers = {};

      for (let i = 0; i < questions.length; i++) {
        const res = await API.post("/ai/generate", {
          question: questions[i],
          language: isLang,
          custom,
        });


        newAnswers[i] = res.data.content;
      }

      setAnswers(newAnswers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAll(false);
    }
  };

  return (
    <div className="p-6">

      <div className="flex gap-4 items-center mb-6">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Upload
        </button>

        <select
          className="p-3 bg-orange-300 rounded-lg"
          value={isLang}
          onChange={(e) =>
            setIsLang(e.target.value)
          }
        >
          <option value="">SELECT LANGUAGE</option>
          <option value="C++">C++</option>
          <option value="C">C</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="JavaScript">JavaScript</option>
        </select>

      <button 
      type="button"
      onClick={() => setIsSelected(!isSelected)}
      className={`p-3 rounded-lg border transition ${
        isSelected 
          ? "bg-green-300 text-white border-green-400" 
          : "bg-red-300 text-white border-red-400"
      }`}
    >
      Output
    </button> 

        <button
          onClick={generateAllAnswers}
          disabled={loadingAll}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          {loadingAll
            ? "Generating..."
            : "Generate All Answers"}
        </button>
 
            
            <button
  onClick={() =>
    navigate("/preview", {
      state: {
        questions,
        answers,
      },
    })
  }
  className="bg-purple-600 text-white px-4 py-2 rounded-lg"
>
  Preview Assignment
</button>

      </div>

      <div className="space-y-6">
     {questions.map((question, index) => (
  <QuestionsCard
    key={index}
    question={question}
    answer={answers[index] || ""}
    onGenerate={() =>
      generateSingleAnswer(
        question,
        index,
        isLang,
        custom,
      )
    }
   
    onAnswerChange={(newAnswer) =>
      setAnswers((prev) => ({
        ...prev,
        [index]: newAnswer,
      }))
    }
    onQuestionChange={(newQuestion) =>
      setQuestions((prev) => {
        const updated = [...prev];
        updated[index] = newQuestion;
        return updated;
      })
    }
  />
))}
      </div>

    </div>
  );
};

export default Upload;