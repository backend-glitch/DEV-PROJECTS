import React, { useState } from "react";
import Avatar from "../avatar/Avatar";

const Navbar = ({ children }) => {

  const [loading,setLoading] = useState(false);
 
  const user = JSON.parse(localStorage.getItem("user"));

  const naam = user?.name || "User";
  const email = user?.email || "Email";

  //console.log("USER FROM STORAGE:", user);
//console.log("NAME:", naam);

  return (
    <div className="flex min-h-screen bg-ui-200 border rounded border-none">

      <div className="flex-1 flex flex-col">

        <div className="bg-ui-600 shadow px-6 py-4 flex justify-between items-center rounded-full">

          <h2 className="text-lg text-white font-semibold">
            TRACK<span className="text-ui-700 font-extrabold"> HOBI</span>
          </h2>

       <div className="flex space-x-2">


        <Avatar name={naam} email={email}  />

                 <button
            onClick={() => {
            //  setLoading(true).finally(() => setLoading(false));
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="bg-ui-600 text-white px-4 py-2 rounded-lg hover:bg-ui-700 transition"
          >
            Logout
          </button>

          </div>

        </div>

        <div className="p-6">{children}</div>

      </div>
    </div>
  );
};

export default Navbar;