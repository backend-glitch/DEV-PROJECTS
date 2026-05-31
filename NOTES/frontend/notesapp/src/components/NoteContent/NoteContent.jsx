import React from "react";
import ReactMarkdown from "react-markdown";

const NoteContent = ({ content }) => {
  return (
    <div className="prose max-w-none text-slate-700">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default NoteContent;