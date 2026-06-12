import { useEffect, useState } from "react";
import API from "../../connection/axios.js";
import { FaCheck, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Sidebar from "../../components/layout/bars/Sidebar.jsx";
import { Link } from "react-router-dom";

const Monthly = () => {
  const [monthDays, setMonthDays] = useState([]);
  const [habits, setHabits] = useState([]);

  const getMonthDays = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);

      days.push({
        day: i,
        date: date.toISOString().split("T")[0],
      });
    }

    return days;
  };

  const fetchData = async () => {
    try {
      const res = await API.get("/habits/gethabit");

      setHabits(res.data);
      setMonthDays(getMonthDays());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPriorityLabel = (priority) => {
    if (priority === "high") return "A";
    if (priority === "medium") return "B";
    return "C";
  };

  const getPriorityStyle = (priority) => {
    if (priority === "high") return "bg-red-500 text-white";
    if (priority === "medium") return "bg-yellow-400 text-black";
    return "bg-green-400 text-black";
  };

  return (
    <Sidebar>
      <div className="bg-ui-600 shadow px-6 py-4 flex justify-between items-center rounded-full">
        <h2 className="text-lg text-white font-semibold">
          TRACK
          <span className="text-ui-700 font-extrabold">HOBI</span>
        </h2>

        <div className="flex space-x-5 items-center">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-lg text-white bg-ui-500 hover:bg-ui-300"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft />
          </button>

          <h3 className="text-lg font-semibold text-white">
            Monthly Habit Grid
          </h3>

         <Link to="/yearly">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-lg text-white bg-ui-500 hover:bg-ui-300"
          >
            <FaArrowRight />
          </button>
          </Link>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-ui-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-ui-300 rounded-xl shadow mt-6 p-4 overflow-x-auto">
        <table className="min-w-full text-center">
          <thead>
            <tr>
              <th className="p-2">Priority</th>
              <th className="p-2">Habit</th>

              {monthDays.map((day) => (
                <th key={day.date} className="text-xs p-1">
                  {day.day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {habits.map((habit) => (
              <tr key={habit._id}>
                <td className="p-2">
                  <span
                    className={`text-xs px-3 py-1 rounded ${getPriorityStyle(
                      habit.priority
                    )}`}
                  >
                    {getPriorityLabel(habit.priority)}
                  </span>
                </td>

                <td className="p-2 whitespace-nowrap">
                  {habit.title}
                </td>

                {monthDays.map((day) => {
                  const done =
                    habit.completedDates?.includes(day.date);

                  return (
                    <td key={day.date} className="p-1">
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded ${
                          done ? "" : "bg-gray-200"
                        }`}
                        style={{
                          backgroundColor: done
                            ? habit.color
                            : undefined,
                        }}
                      >
                        {done && (
                          <FaCheck className="text-white text-xs" />
                        )}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Sidebar>
  );
};

export default Monthly;