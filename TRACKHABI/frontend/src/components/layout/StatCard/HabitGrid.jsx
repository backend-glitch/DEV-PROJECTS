import { useEffect, useState } from "react";
import API from "../../../connection/axios.js";

function HabitGrid({refresh}) {
  const [habits, setHabits] = useState([]);
  const [weekDays, setWeekDays] = useState([]);


  const getLast7Days = () => {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      days.push({
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        date: d.toISOString().split("T")[0],
      });
    }

    return days;
  };

  const fetchData = async () => {
    const res = await API.get("/habits/gethabit");
    setHabits(res.data);
    setWeekDays(getLast7Days());
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6 overflow-x-auto">
      <h3 className="mb-4 font-semibold text-gray-600">
        Weekly Habit Grid
      </h3>

      <table className="min-w-full text-center border">

        {/* HEADER */}
        <thead>
          <tr>
            <th className="p-2 border">Habit</th>

            {weekDays.map((day, i) => (
              <th key={i} className="p-2 border text-sm">
                {day.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {habits.map((habit) => (
            <tr key={habit._id}>

              {/* Habit Name */}
              <td className="p-2 border text-left">
                {habit.icon} {habit.title}
              </td>

              {/* Days */}
              {weekDays.map((day, i) => {
                const done = habit.completedDates.includes(day.date);

                return (
                  <td key={i} className="p-2 border">
                    <span
                      className={`inline-block w-6 h-6 rounded ${
                        done ? "bg-green-500" : "bg-gray-200"
                      }`}
                    ></span>
                  </td>
                );
              })}

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default HabitGrid;