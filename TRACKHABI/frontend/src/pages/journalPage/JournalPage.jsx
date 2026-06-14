import JournalForm from "../../components/layout/journal/JournalForm";
import JournalList from "../../components/layout/journal/JournalList";
import { journalEntries } from "../../components/layout/Dummy/Dummy.js";
import Sidebar from "../../components/layout/bars/Sidebar.jsx";
import { FaArrowLeft,FaBook } from "react-icons/fa6";

export default function JournalPage() {
  return (

    <Sidebar>

          <div className="bg-ui-600 shadow px-6 py-4 flex justify-between items-center rounded-full">
        
        
                  <h2 className="text-lg text-white font-semibold">TRACK<span className="text-ui-700 font-extrabold">HOBI</span></h2>
        
       
        
            <div className="flex space-x-5">
        
               <button 
          className="w-10 h-10 mt-2 flex items-center place-content-center rounded-lg text-md text-white bg-ui-500 hover:bg-ui-300" 
         
        >
        
        
        
          <FaBook/>
        </button>
        
        
             <h3 className="mb-4 mr-5 pt-3 text-lg font-semibold text-white ">
              Daily Logs
              </h3>

      </div>
      </div>

    <div className="max-w-4xl  bg-ui-300 mt-5  rounded-lg mx-auto p-6">

      <h1 className="text-3xl text-ui-500 font-bold mb-6">
        Daily Journal
      </h1>

      <JournalForm />

      <div className="mt-8">
        <JournalList
          entries={journalEntries}
        />
      </div>

    </div>

    </Sidebar>
  );
}