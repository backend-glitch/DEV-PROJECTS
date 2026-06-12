import React from 'react';
  import { useState,useEffect } from 'react';

const Theme = () => {

      const [theme,setTheme] = useState("forest");
    
      useEffect(() => {
          document.documentElement.setAttribute("data-theme",theme);
      }, [theme]);

  return (
   
<>

<h2 className='text-slate-700 font-bold pb-5 pl-7'>THEMES</h2>
    <div className='flex flex-row pl-4  gap-5 items-center'>

        <div className='bg-green-400 rounded-full w-5 h-5 hover:bg-green-500 ' onClick={() => setTheme("forest")}>

        </div>

           <div className='bg-red-400 rounded-full w-5 h-5 hover:bg-red-500'  onClick={() => setTheme("chilli")}>
            
        </div>

           <div className='bg-purple-400 rounded-full w-5 h-5 hover:bg-purple-500'  onClick={() => setTheme("bloom")}>
            
        </div>
    </div>

    </>
  )
}

export default Theme