import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NotesCard from "../../components/Cards/NotesCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import api from "../../api/axios.js";
import { FaGithub } from "react-icons/fa6";

import lottieReact from "lottie-react";
import nonoteanimation from "../../assets/nonote.json";
import GithubIcon from "../../components/icons/GithubIcon.jsx";
import toast from "react-hot-toast";

const Lottie = lottieReact.default;


Modal.setAppElement("#root");

const Home = () => {
  const [openAddEditNotes, setOpenAddEditNotes] = useState({
    isShown: false,
    type: "add",
    data: null,
    level: null,
  });

  const [notes, setNotes] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("ALL");
  const [filteredNotes, setFilteredNotes] = useState([]);

  // to preview
  const [viewNote, setViewNote] = useState({
    isOpen : false,
    data : null,
  });

  const handelView = (note) => {

    setViewNote({
      isOpen : true,
      data : note,
    })
  }
 
  const getNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/getmynote", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes(response.data);

      toast.success("Welcome Back")
    } catch (error) {
      console.log("GET NOTES ERROR:", error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

 
  useEffect(() => {
    setFilteredNotes(notes);
  }, [notes]);

  
  const deleteNote = async (id) => {
    const previous = notes;

    setNotes((prev) => prev.filter((note) => note._id !== id));

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Note Deleted Successfully")
    } catch (error) {
      setNotes(previous);
      console.log("DELETE FAILED:", error);
    }
  };


  const applyFilters = (query, level = selectedLevel) => {
    let updatedNotes = [...notes];

    
    if (level !== "ALL") {
      updatedNotes = updatedNotes.filter(
        (note) => note.level === level
      );
    }

   
    if (query?.trim()) {
      const q = query.toLowerCase();

      updatedNotes = updatedNotes.filter((note) => {
        return (
          note.title?.toLowerCase().includes(q) ||
          note.content?.toLowerCase().includes(q) ||
          note.tags?.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    setFilteredNotes(updatedNotes);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(query, selectedLevel);
  };

  const handleLevelFilter = (level) => {
    setSelectedLevel(level);
    applyFilters(searchQuery, level);
  };

  const onClearSearch = () => {
    setSearchQuery("");
    setFilteredNotes(notes);
  };


  return (
    <>
   

      <Navbar
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        searchQuery={searchQuery}
        selectedLevel={selectedLevel}
        handleLevelFilter={handleLevelFilter}

      
      />

      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-10 mt-8 mr-100">

          {filteredNotes.length > 0 ? (
  filteredNotes.map((note) => (
    <NotesCard
      key={note._id}
      title={note.title}
      level={note.level}
      content={note.content}
      tags={note.tags}
      isPinned={note.isPinned}
      date={new Date(note.createdAt).toLocaleDateString()}
      onEdit={() => {  setOpenAddEditNotes({
      isShown: true,
      type: "edit",
      data: note,
      level: note.level,
    })}}
      onDelete={() => deleteNote(note._id)}
      onPinNote={() => {}}

      onClick={() => handelView(note)}
    />
  ))
) : (
<>
  <GithubIcon />

  <div className="col-span-4 flex flex-col items-center justify-center mt-10">
    <Lottie
      animationData={nonoteanimation}
      loop
      className="w-96"
    />

    <h2 className="text-2xl font-semibold text-slate-700">
      No Notes Yet
    </h2>

    <p className="text-slate-500 mt-2">
      Create your first note to get started.
    </p>
  </div>
  </>
)}


        </div>
      </div>

    
      <button
        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-secondary hover:bg-yellow-400 shadow-xl transition-all fixed right-10 bottom-10"
        onClick={() =>
          setOpenAddEditNotes({
            isShown: true,
            type: "add",
            data: null,
            level: null,
          })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

     
      <Modal
        isOpen={openAddEditNotes.isShown}
        onRequestClose={() =>
          setOpenAddEditNotes({
            isShown: false,
            type: "add",
            data: null,
            level: null,
          })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        }}
        className="w-[500px] max-h-1/2 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
      >
        <AddEditNotes
          type={openAddEditNotes.type}
          noteData={openAddEditNotes.data}
          level={openAddEditNotes.level}
          setNotes={setNotes}
          onClose={() =>
            setOpenAddEditNotes({
              isShown: false,
              type: "add",
              data: null,
              level: null,
            })
          }
        />
    
      </Modal>

         {/* VIEW MODAL */}
    <Modal
      isOpen={viewNote.isOpen}
      onRequestClose={() =>
        setViewNote({ isOpen: false, data: null })
      }
       style={{
    overlay: {
      backgroundColor: "rgba(0,0,0,0.8)", 
    },
  }}
      className="w-[900px] max-h-[80vh]  overflow-y-auto  bg-orange-200 mx-auto mt-10 p-6 rounded overflow-scroll"
    >
      {viewNote.data && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            {viewNote.data.title}
          </h2>

          <div className="text-slate-700">
            {viewNote.data.content}
          </div>
        </>
      )}
    </Modal>


    </>
  );
};

export default Home;

// Home component loads
// ↓
// React renders page
// ↓
// useEffect runs
// ↓
// getNotes()
// ↓
// API request sent
// ↓
// Notes received
// ↓
// setNotes(response.data)
// ↓
// React re-renders with notes