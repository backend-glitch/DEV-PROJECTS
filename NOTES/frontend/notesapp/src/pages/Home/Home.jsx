import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NotesCard from "../../components/Cards/NotesCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

const Home = () => {

  const [openAddEditNotes, setOpenAddEditNotes] = useState({
    isShown : false,
    type: "add",
    data : null,
  });

    return(
       <>
     <Navbar />

     <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-4 mt-8 ">

<NotesCard title="coding react" level="A" date="3rd april" content="" tags="#coding" isPinned={true} onEdit={() => {}} onDelete={() => {}} onPinNote={() => {}}/>
  <NotesCard title="coding react" level="B" date="3rd april" content="" tags="#coding" isPinned={true} onEdit={() => {}} onDelete={() => {}} onPinNote={() => {}}/>
 <NotesCard title="coding react" level="C" date="3rd april" content="" tags="#coding" isPinned={true} onEdit={() => {}} onDelete={() => {}} onPinNote={() => {}}/>
   <NotesCard title="coding react" level="A" date="3rd april" content="" tags="#coding" isPinned={true} onEdit={() => {}} onDelete={() => {}} onPinNote={() => {}}/>

     </div>
     </div>

     <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-secondary hover:bg-yellow-400 shadow-xl transition-all absolute right-10 bottom-10" onClick={() => {
      setOpenAddEditNotes({isShown:true ,type:"add", data:null});
     }} >
      <MdAdd className="text-[32px] text-white  " />
      </button>


<Modal isOpen={openAddEditNotes.isShown}
       onRequestClose={() => {}}
       style={{
        overlay : {
          backgroundColor : "rgba(0,0,0,0.2)",
        },
       }}
       contentLabel=""
       className="w-[500px] max-h-1/2 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
       >
      <AddEditNotes
      Type={openAddEditNotes.type}
      noteData={openAddEditNotes.data}
      onClose={() => {
        setOpenAddEditNotes({ isShown:false, type: "add" ,data:null});
      }} />

      </Modal>

       </>
    )
}

export default Home;