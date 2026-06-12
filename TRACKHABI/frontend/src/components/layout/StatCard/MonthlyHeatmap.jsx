import { useEffect, useState } from "react";
import API from "../../../connection/axios.js";

function MonthlyHeatmap({refresh}) {
  const [data, setData] = useState([]);

  const getMonthName = () => {
  return new Date().toLocaleString('default', { month: 'long' });
};

  const currMonth = getMonthName();

  const getDaysInMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const days = new Date(year, month + 1, 0).getDate();

    const dates = [];

    for (let i = 1; i <= days; i++) {
      const date = new Date(year, month, i)
        .toISOString()
        .split("T")[0];

      dates.push(date);
    }

    return dates;
  };

const getColor = (count) => {
  if (count === 0) return "bg-white";
  if (count === 1 || count === 2) return "bg-ui-400";
  if (count === 3 || count === 4) return "bg-ui-600";
  return "bg-ui-700";
};

  const fetchData = async () => {
    const res = await API.get("/habits/gethabit");
    const habits = res.data;

    const days = getDaysInMonth();
  

    const result = days.map((date) => {
      let count = 0;

      habits.forEach((habit) => {
        if (habit.completedDates.includes(date)) {
          count++;
        }
      });

      return { date, count };
    });

    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div className="bg-ui-300 p-4 rounded-xl shadow mt-6">
      <h3 className="mb-4 font-semibold text-gray-600">
        Month - {currMonth}
      </h3>

      <div className="grid grid-cols-7 gap-2">
        {data.map((day, index) => (
          <div
            key={index}
            title={`${day.date} - ${day.count} habits`}
            className={`w-8 h-8 rounded ${getColor(day.count)}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default MonthlyHeatmap;