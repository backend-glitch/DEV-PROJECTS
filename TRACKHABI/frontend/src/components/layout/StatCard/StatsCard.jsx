import { useEffect, useState } from "react";
import API from "../../../connection/axios.js";

function StatsCards({refresh}) {
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
    <div className="grid grid-cols-4 gap-6 mb-6">

      <div className="bg-ui-600 p-4 rounded-xl shadow">
        <h3 className="text-black">Total Habits</h3>
        <p className="text-2xl font-bold">{stats.totalHabits}</p>
      </div>

      <div className="bg-ui-500 p-4 rounded-xl shadow">
        <h3 className="text-black">Completed Today</h3>
        <p className="text-2xl font-bold">{stats.completedToday}</p>
      </div>

      <div className="bg-ui-400 p-4 rounded-xl shadow">
        <h3 className="text-black">Completion %</h3>
        <p className="text-2xl font-bold">{stats.completionRate}%</p>
      </div>

      <div className="bg-ui-300 p-4 rounded-xl shadow">
        <h3 className="text-black">Streak </h3>
        <p className="text-2xl font-bold">{stats.streak} days</p>
      </div>

    
    </div>
  );
}

export default StatsCards;