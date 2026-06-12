import React from 'react'
import { useState,useEffect } from 'react';
import API from "../../../connection/axios.js"

const StatProgress = ({refresh}) => {

     const [stats, setStats] = useState({
    totalHabits: 0,
    completedToday: 0,
    completionRate: 0,
    streak: 0,
  });

  useEffect(() => {
    API.get("/habits/stats").then((res) => {
      setStats(res.data);
    });
  }, [refresh]);

  return (
   
    <div className="bg-ui-400 p-5 rounded-xl shadow mb-2">
  <h3 className="text-white mb-2 mt-2 p-10 text-2xl font-bold">Today's Progress</h3>

  <div className="bg-gray-300 rounded-full">
  <div className="w-full bg-gray-800 rounded-full h-7.5 overflow-visible">
  <div
    className="bg-ui-500 rounded-full h-full transition-all duration-500 min-w-7.5 shadow-ui-600 animate-pulse"
    style={{ width: `${stats.completionRate}%` }}
  ></div>
</div>


  </div>

  <p className="mt-5 text-md text-gray-500 flex items-center gap-1.5">
  <span className="bg-ui-300 text-emerald-700 px-2 py-0.5 rounded-full font-semibold shadow-sm shadow-ui-400">
    {stats.completedToday}
  </span>
  <span>/ {stats.totalHabits} completed</span>
</p>

</div>


  )
}

export default StatProgress