import React from "react";
import { getInitials } from "../../utils/helper";
import FullScreenLoader from "../Loader/FullScreenLoader2";

const ProfileInfo = ({ onLogout ,loading}) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const fullName = user?.fullName || "User";

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(fullName)}
      </div>

      <div>
        <p className="text-sm font-medium">{fullName}</p>

        <button
          className="text-sm text-slate-700 underline hover:text-orange-400"
          onClick={onLogout} disabled ={loading}
        >
            {loading ? <FullScreenLoader /> : "LOGOUT"}
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;