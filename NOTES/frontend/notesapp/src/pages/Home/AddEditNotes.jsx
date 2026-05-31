import React, { useState, useEffect } from "react";
import TagInput from "../../components/Navbar/input/TagInput";
import { MdClose } from "react-icons/md";
import api from "../../api/axios.js";
import toast from "react-hot-toast";

const AddEditNotes = ({ noteData, type, setNotes, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("C");
  const [error, setError] = useState(null);

  //AI integration 
  const [loading, setLoading] = useState(false);

  //const toastId = toast.loading("Generating AI Note ...");

  const generateContent = async() => {

     if (!title.trim()) {
    toast.error("Title is required to Generate Note");
    setError("Title is required");
    return;
  }

  const toastId = toast.loading("Generating AI Note ...");

    try{

      setLoading(true);

      const response = await api.post("/ai/generate",{
        title,
        tags,
        selectedLevel,
      });

      

      setContent(response.data.content);

      toast.success("Note Generated",{
        id: toastId
      });
    }catch(err){
      toast.error("Note Failed",{
        id:toastId
      });

       console.log("AI ERROR:", err);
  console.log("RESPONSE:", err.response?.data);

  toast.error(
    err.response?.data?.error || 
    err.response?.data?.message || 
    err.message
  );
    }finally{
      setLoading(false);
    }
  }

  // RESET + PREFILL FORM
  useEffect(() => {
    if (type === "edit" && noteData) {
      setTitle(noteData.title || "");
      setContent(noteData.content || "");
      setTags(noteData.tags || []);
      setSelectedLevel(noteData.level || "C");
    }

    if (type === "add") {
      setTitle("");
      setContent("");
      setTags([]);
      setSelectedLevel("C");
    }
  }, [type, noteData]);

 // ADD NOTE
  const addNewNote = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/create",
        {
          title,
          content,
          tags,
          level: selectedLevel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("New Note Created");

      // instant UI update
     // setNotes((prev) => [res.data.note, ...prev]);
       setNotes((prev) =>
  [res.data.note, ...prev].filter(Boolean)
);

      onClose();
    } catch (error) {
      console.log("ADD ERROR:", error.response?.data || error.message);
    }
  };


  //EDIT NOTES
  const editNote = async () => {
    const id = noteData?._id;

    if (!id) {
      console.log("❌ Missing note ID", noteData);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        `/${id}`,
        {
          title,
          content,
          tags,
          level: selectedLevel,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Note Updated");

      if (!res.data) {
  console.log("Invalid response:", res.data);
  return;
}

      // instant UI update
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? res.data : n))
      );

     // console.log("NOTES:", notes);
      onClose();
    } catch (error) {
      //  console.log("NOTES:", note);
      console.log("EDIT ERROR:", error.response?.data || error.message);
    }
  };

  
  const handleSubmit = () => {
    if (!title) {
      setError("Please enter a title");
      return;
    }

    if (!content) {
      setError("Please enter content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">

      {/* CLOSE BUTTON */}
      <button
        className="w-10 h-10 absolute top-3 right-3"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-500" />
      </button>

      {/* TITLE */}
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          className="text-2xl outline-none"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          className="text-sm p-2 rounded bg-slate-50 outline-none"
          placeholder="Start writing..."
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* LEVEL */}
      <div className="mt-3">
        <label className="input-label">LEVEL</label>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="border rounded bg-orange-200 ml-2"
        >
          <option value="A">A - High</option>
          <option value="B">B - Medium</option>
          <option value="C">C - Low</option>
        </select>
      </div>

      {/* TAGS */}
      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

        <button
  type="button"
  onClick={generateContent}
  className={`text-white bg-orange-600 px-3 py-1 rounded mt-2 hover:scale-1.1   ${loading 
    ? "bg-gradient-to-r from-orange-500 to-yellow-500 animate-pulse" 
    : "bg-orange-600 hover:bg-orange-700"
  }`}
  disabled={loading}
>
  {loading ? "Generating..." : " 🤖 Generate with AI"}
  
</button>


      {/* ERROR */}
      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}

      {/* SUBMIT */}
      <button
        className="w-full bg-orange-400 text-white font-medium mt-5 p-3 rounded hover:bg-yellow-400"
        onClick={handleSubmit}
      >
        {type === "edit" ? "UPDATE NOTE" : "ADD NOTE"}
      </button>
    </div>
  );
};

export default AddEditNotes;