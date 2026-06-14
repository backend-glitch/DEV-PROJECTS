 import { useState } from "react";
 import {Copy,Check} from "lucide-react";
import {FaCopy,FaCheck} from "react-icons/fa6";

const QuestionsCard = ({
  question,
  answer,
  onGenerate,
   onAnswerChange,
   onQuestionChange,
  
}) => {

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(answer);
   
        setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="rounded-xl bg-orange-200 p-5 shadow-md">


 <div className="min-h-60  max-h-96 overflow-y-scroll resize-y bg-orange-200 rounded p-3 mb-5 no-scrollbar">
      <textarea
  value={question}
  onChange={(e) => onQuestionChange(e.target.value)}
  className="w-full min-h-200 p-4 rounded-lg bg-yellow-200 outline-none resize-y no-scrollbar"
   />
  </div>

      <button
        onClick={onGenerate}
        className="bg-orange-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-orange-800"
      >
        Generate
      </button>

      {answer && (
        <div className="mt-6 relative">


          <h3 className="font-bold text-lg mb-3">
            Answer
          </h3>

              <button
        onClick={handleCopy}
        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-800 right-3 top-12 absolute"
      >
         {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>

    <textarea
  value={answer}
  onChange={(e) => onAnswerChange(e.target.value)}
  className="w-full min-h-200 p-4 rounded-lg bg-yellow-200 outline-none resize-y no-scrollbar"
   />

        </div>
      )}
    </div>
  );
};

export default QuestionsCard;