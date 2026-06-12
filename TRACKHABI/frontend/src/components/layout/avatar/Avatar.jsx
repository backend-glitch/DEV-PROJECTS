import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

const Avatar = ({ name ,email}) => {

  const [isAvatar, setIsAvatar] = useState(false);

  const naam = name.toUpperCase();

  return (
    <>
    <img
      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
        name || "User"
      )}&background=000000&color=ffffff`}
      alt="avatar"
      className="w-10 h-10 rounded-full cursor-pointer"
      onClick={() => setIsAvatar(!isAvatar)}
    />

    {isAvatar && ( <div className="fixed inset-0 bg-white/10 bg-opacity-100 flex justify-center items-center z-5 backdrop-blur-md">

      <div className="bg-white w-96 h-96 rounded-lg text-md flex items-center content-center flex-col space-y-5 relative ">
          
          <FaXmark  className="absolute top-5 right-5 text-black font-bold text-3xl cursor-pointer hover:text-ui-700" onClick={()=> setIsAvatar(!isAvatar)}/>

          <img
      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
        name || "User"
      )}&background=000000&color=ffffff`}
      alt="avatar"
      className="w-20 h-20 rounded-full cursor-pointer mt-5"
    />

    <h2 className="text-lg font-semibold ">Profile</h2>

        <h2 className="text-lg font-semibold ">NAME : {naam}</h2>
           <h2 className="text-lg font-semibold ">EMAIL : {email}</h2>


      </div>
    </div>)}
    </>
  );
};
 
export default Avatar