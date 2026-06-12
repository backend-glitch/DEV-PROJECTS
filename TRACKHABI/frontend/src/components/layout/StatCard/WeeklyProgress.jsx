import { useEffect, useState } from "react";
import API from "../../../connection/axios.js";

function WeeklyProgress() {
  const [weekData, setWeekData] = useState([]);

    const today = new Date().toISOString().split("T")[0];

  const getWeekDates = () => {
    const today = new Date();
    const day = today.getDay(); 

    const start = new Date(today);
    start.setDate(today.getDate() - day + 1); // Monday start

    const days = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);

      days.push({
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        date: d.toISOString().split("T")[0],
      });
    }

    return days;
  };

  const fetchWeekProgress = async () => {
    const res = await API.get("/habits/gethabit"); 
    const habits = res.data;

    const week = getWeekDates();

    const result = week.map((day) => {
      const allCompleted = habits.every((habit) =>
        habit.completedDates.includes(day.date)
      );



      return {
        ...day,
        done: allCompleted,
      };
    });

    setWeekData(result);
  };

  useEffect(() => {
    fetchWeekProgress();
  }, []);

  return (
    <div className="bg-pink-200 p-4 rounded-xl shadow mb-6">
      <h3 className="text-gray-600 mb-4 font-semibold mt-5">
        Weekly Progress
      </h3>

      <div className="flex justify-between text-center">

      
      {weekData.map((day, index) => (
     <div key={index} className="flex flex-col items-center">

    <span
      className={`text-sm ${
        day.date === today
          ? "font-bold text-blue-600"
          : "text-gray-500"
      }`}
    >
      {day.label}
    </span>

    <span
      className={`text-xl mt-1 ${
        day.done ? "text-green-500" : "text-red-400"
      }`}
    >
      {day.done ? "✔" : "✖"}
    </span>

  </div>
))}

      </div>
    </div>
  );
}

export default WeeklyProgress;