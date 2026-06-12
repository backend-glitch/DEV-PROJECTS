import { useState } from "react";
import { FaBars, FaTimes,FaGithub,FaLinkedin,FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
import Theme from "./themes/Theme";
import Sidebar from "./bars/Sidebar";
import Navbar from "./bars/navbar";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (

     <Sidebar>

  <Navbar  children={children}/>

    </Sidebar>
  );
}

export default Layout;