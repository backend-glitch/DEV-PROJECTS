import React from 'react'

const Gender = () => {
  return (
    <div className='flex mt-5 gap-5'>

<div className='form-control'>
    <label className={`label gap-2 cursor-pointer`} >
        <span className='label-text text-red-400'>Male</span>
        <input type='checkbox' className='checkbox border-red-700 text-blue-400'></input>
    </label>
</div>

<div className='form-control'>
    <label className={`label gap-2 cursor-pointer`} >
        <span className='label-text text-red-400'>Female</span>
        <input type='checkbox' className='checkbox border-red-700 text-pink-400'></input>
    </label>
</div>

    </div>
  )
}

export default Gender