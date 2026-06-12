// import { FaRegCircle,FaCheckCircle } from "react-icons/fa";

// function HabitItem({ habit, today, toggleHabit }) {

//   const done = habit.completedDates.includes(today);

//   return (
//     <div className={`${done ? "bg-green-300" : "bg-blue-200"} p-4 rounded-lg shadow flex justify-between items-center`}>
//       <span>{habit.title}</span>
//       {/* <span>{habit.completedDates[0]}</span> */}

//     <button 
//   className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
//     done ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//   }`}
//   onClick={() => toggleHabit(habit._id)}
// >
//   {done? <FaCheckCircle className="text-xl" /> : <FaRegCircle className="text-xl" />}
 
// </button>

//     </div>
//   );
// }

// export default HabitItem;

import { useState } from "react";
import { FaRegCircle, FaCheckCircle, FaEdit, FaTrash } from "react-icons/fa";
import API from "../../../connection/axios";
import HomeCardBtn from "../buttons/homeCardBtn";

function HabitItem({ habit, today, toggleHabit, refresh }) {
  const done = habit.completedDates.includes(today);

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(habit.title);

  const getPriorityLabel = (priority) => {
  if (priority === "high") return "A ";
  if (priority === "medium") return "B ";
  return "C ";
};

const getPriorityStyle = (priority) => {
  if (priority === "high") return "bg-red-500 text-white";
  if (priority === "medium") return "bg-yellow-400 text-black";
  return "bg-green-400 text-black";
};

 {/*
  const handleDelete = async () => {
    await API.delete(`/habits/${habit._id}/deletehabit`);
    refresh();
  };

  
  const handleUpdate = async () => {
    if (!newTitle) return;

    await API.put(`/habits/${habit._id}/updatehabit`, { title: newTitle });
    setIsEditing(false);
    refresh();
  };

  */}

  return (
    <div
      className={`${
        done ? "bg-ui-200" : "bg-white"
      } p-4 rounded-lg shadow flex justify-between items-center`}
    >
     
      <div className="flex items-center gap-3">

      {/* { !isEditing && (
        <button
          onClick={() => toggleHabit(habit._id)}
          className={`text-xl ${
            done ? "text-green-700" : "text-gray-500"
          }`}
        >
          {done ? <FaCheckCircle /> : <FaRegCircle />}
        </button>

        )} */}
        
        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="px-2 py-1 border rounded"
          />
        ) : (
          <span
            className={`font-medium ${
              done ? " text-gray-500" : ""
            }`}
          >
          
            {habit.title}

            {/* <div>{habit.completedDates}</div> */}

              <span className={`text-xs ml-3 px-3 py-1  rounded ${getPriorityStyle(habit.priority)}`}>
    {getPriorityLabel(habit.priority)}
  </span>
            
          </span>
        )}
      </div>

      
      {/* <div className="flex  gap-0  items-center ">

        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-yellow-600 hover:text-yellow-800 px-3 py-1"
          >
            <FaEdit />
          </button>
        )}

{!isEditing && (
  
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 px-3 py-1"
        >
          <FaTrash />
        </button>
    
)}

      </div> */}


 <div className="flex gap-5">
   <HomeCardBtn isEditing={isEditing} setIsEditing={setIsEditing} newTitle={newTitle} habit={habit} refresh={refresh}/>

     <button 
  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
     done ? "bg-ui-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
   }`}
   onClick={() => toggleHabit(habit._id)}
>
   {done? <FaCheckCircle className="text-xl" /> : <FaRegCircle className="text-xl" />}
 
 </button>
 </div>

   </div>
  );
}

export default HabitItem;