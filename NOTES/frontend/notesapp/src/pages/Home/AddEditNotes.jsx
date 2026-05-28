import React, { useState } from "react";
import TagInput from "../../components/Navbar/input/TagInput";
import { MdClose, MdEditNote } from "react-icons/md";

const AddEditNotes = ({noteData, Type,onClose}) => {

    const {title,setTitle}=  useState("");
    const [content, setContent] = useState("");
    const [tags,setTags] = useState([]);

    const [error, SetError ] = useState(null);

  const addNewNote = async() => {

  }

  const editNote = async() => {

  }

    const HandleError = () => {
        if(!title){
            SetError("Please Enter a Title");
            return;
        }
            if(!content){
            SetError("Please Enter the Content");
            return;
        }

        SetError("");

        if(type === 'edit'){
            editNote();
        }else{
            addNewNote();
        }
    }

    return(
<div className="relative">

    <button className="w-10 h-10 rounded-full items-center justify-center absolute top-3 right-3  hover:text-black-400 "  onClick={onClose}>
    <MdClose className="text-xl text-slate-400" />
    </button>

    <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>

        <input
        type="text"
        className="test-2xl text-slate-950 outline-none"
        placeholder="complete Title"
        value={title}
        onChange={({target}) => setTitle(target.value)}
        />
    </div>

      <div className="flex  flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>

          <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="start writing .."
          row={10}
            value={content}
        onChange={({target}) => setContent(target.value)}
          />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags}/>
      </div>

     {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button className=" w-full bg-orange-400 text-white font-medium mt-5  p-3 rounded" onClick={HandleError} >
        ADD
      </button> 
</div> 
    )
}

export default AddEditNotes;
