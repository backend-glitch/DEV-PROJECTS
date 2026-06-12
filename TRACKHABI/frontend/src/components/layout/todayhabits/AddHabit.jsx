import { useState } from "react";
import API from "../../../connection/axios";
import { FaCheck, FaPlus } from "react-icons/fa6";

function AddHabit({ refresh }) {
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    note: "",
    startDate: "",
    priority: "medium",
    color: "#3b82f6",
    icon: "✅",
  });

  const handleAdd = async () => {
    if (!form.title) return;

     await API.post("/habits/addhabit", form);

    setForm({
      title: "",
      note: "",
      startDate: "",
      priority: "medium",
      color: "#3b82f6",
      icon: "✅",
    });

   
    setIsOpen(false);
    refresh();
  };


  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-ui-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-ui-700"
      >
        <div className="flex">
       <FaPlus className="text-bold mt-1 gap-4"/> Add Habit
       </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-white/10 bg-opacity-100 flex justify-center items-center z-5 backdrop-blur-2xl">

          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-xl w-106 shadow-lg space-y-3"
          >
            <h2 className="text-lg font-bold">New Habit</h2>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />

            <input
              type="date"
              value={form.startDate}
              onChange={(e) =>
                setForm({ ...form, startDate: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />

            <textarea
              placeholder="Note"
              value={form.note}
              onChange={(e) =>
                setForm({ ...form, note: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />

         
            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

          
            <input
              type="color"
              value={form.color}
              onChange={(e) =>
                setForm({ ...form, color: e.target.value })
              }
              className="w-full h-10"
            />

            {/* Icon */}
            {/* <input
              placeholder="Emoji (e.g. 🏃)"
              value={form.icon}
              onChange={(e) =>
                setForm({ ...form, icon: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            /> */}

            <select value={form.value} onChange={(e) =>
                setForm({ ...form, icon: e.target.value })
              }
              className="w-full border px-3 py-2 rounded text-slate-400">
                  <option value="">Enter Emoji</option>
                <option value="1">🎯</option>
                  <option value="2">👏</option>
                    <option value="3">🚀</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="bg-ui-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddHabit;