import React from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { useState } from "react";

const  TagInput = ({tags , setTags}) => {

    const [inputValue , setInputValue] = useState("");

    const handleInputValue = (e) => {
         setInputValue(e.target.value);
    };

    const addNewTag = () => {
        if(inputValue.trim() !== ""){
            setTags([...tags,inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if(e.key === "Enter") addNewTag();
    };

    const handleRemoveTag = (tagToremove) => {
        setTags(tags.filter((tag) => tag !== tagToremove))
    };

    return(
//<div>tags</div>



<div>

   {tags?.length > 0 && (<div className="flex items-center gap-2 felx-wrap mt-2">

     {tags.map((tag,index) => (
        <span key={index} className="flex items-center gap-2 text-sm bg-slate-200 text-black py-1 rounded">
            # {tag}
            <button onClick={() => {handleRemoveTag(tag)}}>
                <MdClose />
            </button>
        </span>
     ))}
   </div>
    )}

    <div className="flex items-center gap-4 mt-3">
        <input type="text" value={inputValue} className="text-sm bg-transparent border border-slate-400 px-3py-2 rounded-md" placeholder="Add tags" onChange={handleInputValue} onKeyDown={handleKeyDown}/>

        <button  className="flex items-center justify-center rounded border border-orange-400 bg-orange-400 hover:bg-white " onClick={() => {addNewTag()}}>
            <MdAdd className="text-2xl text-white hover:text-orange-400"/>
        </button>
    </div>
</div>
    )
}

export default TagInput;