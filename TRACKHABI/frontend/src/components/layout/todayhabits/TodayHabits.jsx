import { useEffect, useState } from "react";
import API from "../../../connection/axios.js";
import HabitItem from "./HabitItem";
import AddHabit from "./AddHabit";

const TodayHabits = ({onChange}) => {

  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const res = await API.get("/habits/gethabit");
  
    setHabits(res.data);
  };

  const toggleHabit = async (id) => {
    await API.post(`/habits/${id}/toggle`);

    
    fetchHabits();
    onChange();
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-ui-500 p-6 rounded-lg">
      <h2 className="text-xl font-bold mt-8 mb-4 text-white">
         Habits
      </h2>

      <AddHabit refresh={fetchHabits} />

      <div className="space-y-3 bg-ui-700 p-10 rounded-lg overflow-scroll no-scrollbar h-96">
        {habits.map((habit) => (
          <HabitItem
            key={habit._id}
            habit={habit}
            today={today}
            toggleHabit={toggleHabit}
             refresh={fetchHabits}
           
          />
        ))}
      </div>
    </div>
  );
}

export default TodayHabits;