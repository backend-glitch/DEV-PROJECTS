import React from "react";
import {MdOutlinePushPin} from "react-icons/md"
import { MdCreate, MdDelete } from "react-icons/md";

const  NotesCard = ({title,level, date,content, tags, isPinned, onEdit, onDelete, onPinNote}) => {

    return(
        <div className =" mt-5 border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
            <div className="flex items-center justify-content">
                <div>
                    <div className="flex items-center gap-5">
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


              <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-secondary' : 'text-slate-500' }` } />

            </div>

            <p className="text-xs text-slate-400 mt-2">{content?.slice(0,60)}</p>

            <div className="flex items-center justify-between mt-2">
            <div className="test-xs text-slate-500">{tags}</div>

            <div className="flex items-center gap-2">
                <MdCreate className="icon-btn hover:text-green-600" onClick={onEdit} />
                <MdDelete className="icon-btn hover:text-red-500" onClick={onDelete} />
            </div>
        </div>
        </div>
    )
}

export default NotesCard;