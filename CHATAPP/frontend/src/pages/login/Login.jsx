import React from 'react';
import {Link} from "react-router-dom";

 const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
   <div className='w-full p-6 rounded-lg shadow-md bg-white/10 backdrop-blur-lg h-100 space-y-10'>

    <h1 className='text-3xl font-semibold text-center text-black space-x-4'>
      Login

      <span className='text-3xl text-red-700 p-4'>MICHAT</span>
    </h1>

<form>
  <div>
    <label className='label p-2'>
      <span  className='text-base label-text text-red-400'>Username</span>
    </label>

<input type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />

  </div>

   <div>
    <label className='label p-2'>
      <span  className='text-base label-text text-red-400'>Password</span>
    </label>

<input type='text' placeholder='Enter password' className='w-full input input-bordered h-10' />

  </div>

  <a href='#' className='text-sm hover:underline text-red-400  hover:text-red-600 mt-5 inline-block'>
    Don't have an account? Signup
    </a>

    {/* <link to="/signup">
     Don't have an account? Signup
    </link> */}

     <div>
            <button className='btn w-[50%] bg-red-400 btn-sm mt-5 border border-red-600 hover:bg-red-800'>Signup</button>
        </div>


</form>

   </div>

    </div>
  )
}

export default Login;
