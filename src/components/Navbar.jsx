import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = ({name}) => {
  const navigate = useNavigate()
  return (
    <div className="flex gap-4 items-center">
    
      <div className="text-(--text-secondary) text-2xl bg-(--surface) rounded-full p-2 flex h-10 w-10 justify-center items-center">
        <span className="text-(--text)" onClick={()=>{navigate(-1)}}>{"<"}</span>
      </div>
      <span className='text-(--text) text-xl font-bold'>{name}</span>
    </div>
  );
}

export default Navbar