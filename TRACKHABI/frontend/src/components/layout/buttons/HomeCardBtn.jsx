import React from 'react';
import { useState } from 'react';
// Removed trailing comma that causes syntax issues in some environments
import { FaEllipsis } from "react-icons/fa6"; 
import { FaEdit, FaTrash } from "react-icons/fa";
import API from '../../../connection/axios';

const HomeCardBtn = ({ isEditing, setIsEditing, newTitle, habit, refresh }) => {
  const [isMenu, setIsMenu] = useState(false);

  const handleDelete = async (e) => {
   
    e.stopPropagation(); 
    
    try {

      
  console.log("Attempting to delete ID:", habit?._id); 
  
  if (!habit?._id) {
    console.error("Error: habit._id is undefined!");
    return;
  }
  
      await API.delete(`/habits/${habit._id}/deletehabit`);
      setIsMenu(false);
      refresh();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.stopPropagation();
    if (!newTitle) return;

    try {
      await API.put(`/habits/${habit._id}/updatehabit`, { title: newTitle });
      setIsEditing(false);
      setIsMenu(false); // Close menu after saving
      refresh();
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenu(!isMenu);
  };

  return (
    <div className='relative inline-block'>
      <button 
        className='text-md text-ui-500 hover:bg-ui-700 hover:text-ui-600 relative block p-4 rounded' 
        onClick={toggleMenu} 
      >
        <FaEllipsis/>
      </button>

      {isMenu && (
      
        <div className='bg-ui-400 text-white text-md border-none flex flex-col absolute top-full right-0 mt-1 p-2 space-y-2 z-10 rounded-md shadow-lg min-w-20'>
          <div className="flex justify-center">
            {isEditing ? (
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
              >
                Save
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="text-yellow-600 hover:text-yellow-700 px-3 py-1 text-lg"
              >
                <FaEdit />
              </button>
            )}
          </div>

          <div className='bg-slate-600 w-full h-1'></div>
          
          <div className="flex justify-center">
            {!isEditing && (
              <button
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700 px-3 py-1 text-lg"
              >
                <FaTrash />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeCardBtn;
