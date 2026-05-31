import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa6";
import FullScreenLoader from "../Loader/FullScreenLoader";

const Navbar = ({handleSearch, onClearSearch,searchQuery,selectedLevel,handleLevelFilter}) => {

  const location = useLocation();

  const hideUI = location.pathname === "/login" || location.pathname === "/signup";

  
  // const[filteredNotes, setFilteredNotes] = useState("");
 // const [searchQuery, setSearchQuery] = useState("");

 const [loading, setLoading] = useState(false);

  
    const navigate = useNavigate;

    const onLogout = async() => {

try {
  setLoading(true);

  await new Promise((resolve) =>
    setTimeout(resolve, 1000)
  );

  localStorage.clear();
  window.location.href = "/";
} catch (error) {
  console.log(error);
} finally {
  setLoading(false);
}
    };

   
    return (
       // <div>Navbar</div>
       <div className="bg-yellow-200 flex items-center justify-between px-6 py-2 drop-shadow">

          <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "#B85C10",
              display: "flex", alignItems: "center", justifyContent: "center",padding : "10px",
              fontSize: 16, color: "#fff", fontWeight: 700,
            }}>N</div>

      <p className="ml-5 notes-content text-xl text-slate-800 mt-2">
     NOTESLOVER
</p>
      <div className="w-full h-[2px]"></div>

   { !hideUI && (
    <>

    <select
  value={selectedLevel}
  onChange={(e) => handleLevelFilter(e.target.value)}
  className="ml-3 border px-2 py-1 rounded mr-10 text-white bg-orange-300"
>
  <option value="ALL">All</option>
  <option value="A">A</option>
  <option value="B">B</option>
  <option value="C">C</option>
</select>

     <SearchBar value={searchQuery} onChange={({target}) => {handleSearch(target.value);
     }}
    // handleSearch={handleSearch}
     onClearSearch={onClearSearch}
     />

     <ProfileInfo onLogout={onLogout} loading={loading} />

     

    </>
    )}
       </div>
    )
}

export default Navbar;