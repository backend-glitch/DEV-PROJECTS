import { useEffect, useState } from "react";
import API from "../../connection/axios.js";
import { FaSquareCheck,FaCheck,FaBackward,FaArrowLeft,FaArrowRight } from "react-icons/fa6";
import Sidebar from "../../components/layout/bars/Sidebar.jsx";
import { Link } from "react-router-dom";
import Searchbar from "../../components/layout/bars/Searchbar.jsx";


function  Weekly({refresh}) {
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


  return (
   
    
    <Sidebar>
    
      <div className="bg-ui-600 shadow px-6 py-4 flex justify-between items-center rounded-full">


          <h2 className="text-lg text-white font-semibold">TRACK<span className="text-ui-700 font-extrabold">HOBI</span></h2>

  {/* <Searchbar habits={habits}/> */}

    <div className="flex space-x-5">

       <button 
  className="w-10 h-10 flex items-center place-content-center rounded-lg text-md text-white bg-ui-500 hover:bg-ui-300" 
  onClick={() => window.history.back()}
>



  <FaArrowLeft/>
</button>


     <h3 className="mb-4  pt-3 text-lg font-semibold text-white ">
        Weekly Habit Grid
      </h3>
  
    <Link to="/monthly">
    <button 
  className="w-10 h-10 flex items-center place-content-center rounded-lg text-md text-white bg-ui-500 hover:bg-ui-300" 
 
>

  <FaArrowRight/>
  
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
   


   <div className="flex min-h-screen bg-ui-200 border-none rounded">

    <div className="bg-ui-300 w-full p-4 rounded-xl shadow mt-6 ">
     

      <table className="min-w-full text-center border-none">

{/*        
           <span className={`text-xs mr-20 px-3 py-1 rounded ${getPriorityStyle(habit.priority)}`}>
    {getPriorityLabel(habit.priority)}
  </span> */}
          
        <thead>
          <tr>

                 <th className="p-2 border-none">Priority</th>

            <th className="p-2 border-none">Habit</th>

            {weekDays.map((day, i) => (
              <th key={i} className="p-2 border-none text-sm">
                {day.label}
              </th>
            ))}
          </tr>
        </thead>

     
        <tbody>
          {habits.map((habit) => (
            <tr key={habit._id}>

                     
           <span className={`text-xs  px-3 py-1 rounded ${getPriorityStyle(habit.priority)}`}>
    {getPriorityLabel(habit.priority)}
  </span>
              
              <td className="p-2 border-none text-center">
           {habit.title}
              </td>



            
              {weekDays.map((day, i) => {
                const done = habit.completedDates.includes(day.date);

                return (
                  <td key={i} className="p-2 border-none">
                   
                   <span 
                      className={`inline-block w-6 h-6 rounded ${done ? "" : "bg-gray-200"}`}
                       style={{ backgroundColor: done ? habit.color : undefined }}
                        >
                   {done ? <FaCheck className="text-white bg-transparent w-full h-full p-1" /> : undefined}
                        </span>
                   
                  </td>
                );
              })}

            </tr>
          ))}
        </tbody>

      </table>
    </div>

    </div>

</Sidebar>
  
  );
}

export default Weekly;