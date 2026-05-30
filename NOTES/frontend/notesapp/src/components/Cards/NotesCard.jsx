import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

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
}) => {
  return (
    <div className="mt-5 border rounded p-4 bg-white hover:shadow-xl transition-all">

    
      <div className="flex justify-between items-start">

      
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
      <p className="text-sm text-slate-800 mt-2">
        {content?.slice(0, 60)}
      </p>

      {/* ACTIONS */}
      <div className="flex items-center gap-3 mt-3">
        <MdCreate
          className="text-lg cursor-pointer hover:text-green-600"
          onClick={onEdit}
        />
        <MdDelete
          className="text-lg cursor-pointer hover:text-red-500"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default NotesCard;