import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {IoMdClose } from "react-icons/io"

const SearchBar = ({value,onChange,onClearSearch}) => {
    return (
<div className="w-80  flex items-center  mr-40 px-4 bg-orange-200 rounded-md" >
    <input
    type = "text"
    placeholder="Search Notes"
    className="w-full text-xs bg-transparent py-[11px] outline-none"
    value={value}
   onChange={onChange}
    />

    <IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black" onClick={onClearSearch} /> 
    {/* <FaMagnifyingGlass className="text-slate-400 cursor-pointer hover:text-black"  onClick={handleSearch}/> */}
</div>
    )
}

export default SearchBar;