import {React,useState} from 'react'
import { FaBars, FaTimes,FaGithub,FaLinkedin,FaLeaf } from "react-icons/fa";
import { Link ,NavLink } from "react-router-dom";
import Theme from '../themes/Theme';

const Sidebar = ({children}) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  

  return (

     <div className="flex min-h-screen bg-ui-200 border rounded">

     <div
        className={`bg-ui-300 shadow-md p-5 transition-all duration-300 rounded-full ${
          isSidebarOpen ? "w-48 bg-ui-300" : "w-16"
        }`}
      >
     
        <button
          className={`text-2xl mb-6 transition-all duration-300 hover:text-ui-700 ${
             isSidebarOpen ? "translate-x-15" : "translate-x-0"
    }`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

       
        {isSidebarOpen && (
          <>
            {/* <h1 className="text-xl font-bold mb-6">TRACKHABI</h1> */}

            <ul className="space-y-5 transition-all duration-300 ">
               
              <li className="cursor-pointer text-white translate-x-0 text-2xl tex bg-ui-400 rounded-full  p-3 hover:bg-ui-500 text-center">
            
               <NavLink to="/dashboard"  className={({ isActive }) => isActive && "text-3xl text-ui-600"}>
               Home
        </NavLink>

            </li>

               
              <li className="cursor-pointer text-white translate-x-0 text-2xl tex bg-ui-400 rounded-full  p-3 hover:bg-ui-500 text-center">
            
               <NavLink to="/weekly" className={({ isActive }) => isActive && "text-3xl text-ui-600"}>
               Grid
            </NavLink>

            </li>

              <li className="cursor-pointer text-white translate-x-0 text-2xl tex bg-ui-400 rounded-full  p-3 hover:bg-ui-500 text-center">
               <NavLink to="/aiinsight"  className={({ isActive }) => isActive && "text-3xl text-ui-600"}>
                AI Assist
                
                </NavLink>
                
                </li>

              <li className="cursor-pointer text-white translate-x-0 text-2xl tex bg-ui-400 rounded-full  p-3 hover:bg-ui-500 text-center">Stats</li>

            </ul>

            <div className="mt-10 mb-10 w-full h-1 bg-slate-500 rounded-lg"></div>

            {/*  */}
            <Theme/>

                <div className="mt-10 w-full h-1 bg-slate-500 rounded-lg"></div>

            <div className=" mt-10 text-slate-700 text-lg font-semibold">
                <h2>CREDITS</h2>

          <div className="flex gap-5 mt-10 ">
                  <a href="https://github.com/backend-glitch" target="_blank" >
         
            <FaGithub  className="text-4xl hover:text-ui-500"></FaGithub>
         </a>

           
<a href="https://www.linkedin.com/in/arjun-verma-100a26393" target="_blank" >

  <FaLinkedin className="text-4xl hover:text-ui-500" ></FaLinkedin>
</a>

</div>


   <div className="mt-10 w-full h-1 bg-slate-500 rounded-lg"></div>

  {/* <h2 className="mt-5">STACK</h2> */}


            </div>
          </>
        )}

      </div>

  <div className="p-6 w-full">{children}</div>

</div>
  

  )
}

export default Sidebar