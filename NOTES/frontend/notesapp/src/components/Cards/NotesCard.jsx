import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Loader from "../Loader/Loader";
import FullScreenLoader2 from "../Loader/FullScreenLoader2";



const NotesCard = ({
  title,
  level,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  onView,
  loading,
}) => {

  
//const [content, setContent] = useState("");


  return (
    <div className="mt-5 border rounded p-4 bg-white hover:shadow-xl transition-all cursor-pointer ">

    
      <div className="flex justify-between  items-start">

      
        <div>
          <div className="flex items-center gap-3">
            <h6 className="text-sm font-medium">{title}</h6>

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

       
        {/* <MdOutlinePushPin
          className={`text-xl cursor-pointer ${
            isPinned ? "text-secondary" : "text-slate-500"
          }`}
          onClick={onPinNote}
        /> */}
        
      </div>

      {/* TAGS */}
      <div className="mt-2 text-xs text-slate-500">
        #{tags}
      </div>

      {/* CONTENT */}
      {/* <p className="text-sm text-slate-800 mt-2">
        {content?.slice(0, 60)}
        
      </p> */}
      <div className="text-sm text-slate-800 mt-2 line-clamp-4">
      <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {/* ACTIONS */}
    
      <div className="flex items-center gap-3 mt-3">
      
       {loading ? (
      <Loader />
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