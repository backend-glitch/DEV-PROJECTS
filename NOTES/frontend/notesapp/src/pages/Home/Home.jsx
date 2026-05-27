import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import NotesCard from "../../components/Cards/NotesCard";
import { MdAdd } from "react-icons/md";

const Home = () => {
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

     <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-secondary hover:bg-orange absolute right-10 bottom-10" onClick={() => {}} >
      <MdAdd className="text-[32px] text-white " />
      </button>
       </>
    )
}

export default Home;