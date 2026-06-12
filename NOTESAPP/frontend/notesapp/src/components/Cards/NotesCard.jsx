import React from "react";
import { MdCreate, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
import Loader from "../Loader/Loader";
import FullScreenLoader2 from "../Loader/FullScreenLoader2";

const NotesCard = ({
  title,
  level,
  date,
  content,
  tags,
  onEdit,
  onDelete,
  onView,
  loading,
}) => {
  return (
    <div className="mt-5 border rounded p-4 bg-white hover:shadow-xl transition-all cursor-pointer w-full overflow-hidden">

      
      <div className="flex justify-between items-start w-full gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h6 className="text-lg font-semibold break-words">
              {title}
            </h6>

            <div
              className={`text-xs px-3 py-1 rounded text-white ${
                level === "A"
                  ? "bg-red-400"
                  : level === "B"
                  ? "bg-orange-400"
                  : "bg-yellow-400"
              }`}
            >
              {level}
            </div>
          </div>

          <span className="text-xs text-slate-500">{date}</span>
        </div>
      </div>

     
      <div className="mt-2 text-xs text-slate-500 break-words">
        #{tags}
      </div>

   
      <div className="text-sm text-slate-800 mt-2 line-clamp-4 break-words overflow-hidden">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

    
      <div className="flex items-center gap-3 mt-4 flex-wrap">

      
        {loading ? (
          <FullScreenLoader2 />
        ) : (
          <MdCreate
            className="text-lg cursor-pointer hover:text-green-600"
            onClick={onEdit}
          />
        )}

     
        {loading ? (
          <FullScreenLoader2 />
        ) : (
          <MdDelete
            className="text-lg cursor-pointer hover:text-red-500"
            onClick={onDelete}
          />
        )}

       
        <FaEye
          className="text-lg cursor-pointer hover:text-blue-500"
          onClick={onView}
        />

      </div>
    </div>
  );
};

export default NotesCard;