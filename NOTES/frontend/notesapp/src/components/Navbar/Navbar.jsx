import React from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState("");
  
    const navigate = useNavigate;

    const onLogout = () => {

        localStorage.clear();
        window.location.href = "/login";
    //  localStorage.removeItem("token");
      navigate("/login");
    };

    const handleSearch = () => {

    }

    const onClearSearch = () => {
      setSearchQuery("");
    }
  
    return (
       // <div>Navbar</div>
       <div className="bg-yellow-200 flex items-center justify-between px-6 py-2 drop-shadow">
        <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <div className="w-full h-[2px]"></div>

     <SearchBar value={searchQuery} onChange={({target}) => {
      setSearchQuery(target.value);
     }}
     handleSearch={handleSearch}
     onClearSearch={onClearSearch}
     />

     <ProfileInfo onLogout={onLogout} />
       </div>
    )
}

export default Navbar;