import React from 'react'
import { useState } from 'react';

const Searchbar = ({habits}) => {

    const [isFilterData, setIsFilter] = useState({});

    const filteredData = habits.filter((habit) => {
        return habit.priority?.includes(isFilterData);
    })

    console.log(filteredData);

  return (
    <>

    <select className='border-none bg-ui-300 p-3 rounded-md' onChange={(e) => setIsFilter(e.target.value)}>
        <option value="all">ALL</option>
          <option value="high">A</option>
            <option value="medium">B</option>
              <option value="low">C</option>
    </select>
    </>
  )
}

export default Searchbar