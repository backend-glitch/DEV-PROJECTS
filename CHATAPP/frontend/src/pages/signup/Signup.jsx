import React from 'react'
import Gender from './Gender';

const Signup = () => {
  return (
    
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
       <div className='w-full p-6 rounded-lg shadow-md bg-white/10 backdrop-blur-lg h-150 space-y-10'>
    
        <h1 className='text-3xl font-semibold text-center text-black space-x-4'>
          Signup
    
          <span className='text-3xl text-red-700 p-4'>MICHAT</span>
        </h1>
    
    <form>
         <div>
        <label className='label p-2'>
          <span  className='text-base label-text text-red-400'>Name</span>
        </label>
    
    <input type='text' placeholder='Enter name' className='w-full input input-bordered h-10' />
    
      </div>

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
    
    <input type='password' placeholder='Enter password' className='w-full input input-bordered h-10' />
    
      </div>

       <div>
        <label className='label p-2'>
          <span  className='text-base label-text text-red-400'>Confirm Password</span>
        </label>
    
    <input type='password' placeholder='Confirm password' className='w-full input input-bordered h-10' />
    
      </div>

       <div>
        {/* <label className='label p-2 mt-5'>
          <span  className='text-base label-text text-red-400'>gender</span>
        </label> */}
    
    {/* <select type='options' placeholder='Enter username' className='w-full input input-bordered h-10' /> */}

    {/* <details className="dropdown">
  <summary className="btn mt-5">Gender</summary>
  <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm ">
    <li><a>Male</a></li>
    <li><a>Female</a></li>
  </ul>
</details> */}
    
     <Gender />

      </div>
    
      <a href='#' className='text-sm hover:underline text-red-400  hover:text-red-600 mt-5 inline-block'>
        Already have an account? Login
        </a>

        <div>
            <button className='btn bg-red-400 btn-sm w-[50%] mt-5 border border-red-600 hover:bg-red-800'>Signup</button>
        </div>
    
    
    </form>
    
       </div>
    
        </div>
      )
    }
    
  

export default Signup;