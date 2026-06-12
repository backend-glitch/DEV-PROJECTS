import { useEffect, useState } from "react";
import API from "../../connection/axios.js";
import { FaArrowLeft } from "react-icons/fa6";
import Sidebar from "../../components/layout/bars/Sidebar.jsx";

const Yearly = () => {
  const [yearDays, setYearDays] = useState([]);
  const [habits, setHabits] = useState([]);

  const getYearDays = () => {
    const year = new Date().getFullYear();

    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    const days = [];

    const current = new Date(start);

    while (current <= end) {
      days.push({
        date: current.toISOString().split("T")[0],
      });

      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const fetchData = async () => {
    try {
      const res = await API.get("/habits/gethabit");

      setHabits(res.data);
      setYearDays(getYearDays());
    } catch (err) {
      console.log(err);
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
          TRACK<span className="text-ui-700 font-extrabold">HOBI</span>
        </h2>


  

          <h3 className="text-lg font-semibold text-white">
            Yearly Habit Grid
          </h3>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg text-white bg-ui-500"
          onClick={() => window.history.back()}
        >
          <FaArrowLeft />
        </button>
      </div>

      <div className="bg-ui-300 rounded-xl shadow mt-6 p-4 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-6">
          Yearly Habit Grid ({new Date().getFullYear()})
        </h3>

        <div className="space-y-6">
          {habits.map((habit) => (
            <div key={habit._id}>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`text-xs px-2 py-1 rounded ${getPriorityStyle(
                    habit.priority
                  )}`}
                >
                  {getPriorityLabel(habit.priority)}
                </span>

                <span className="font-medium">
                  {habit.title}
                </span>
              </div>

              <div className="flex flex-wrap gap-0.5">
                {yearDays.map((day) => {
                  const done = habit.completedDates?.includes(
                    day.date
                  );

                  return (
                    <div
                      key={day.date}
                      className="w-5 h-5 rounded-sm"
                      style={{
                        backgroundColor: done
                          ? habit.color
                          : "white",
                      }}
                      title={day.date}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default Yearly;