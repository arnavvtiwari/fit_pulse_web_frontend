import React, { useEffect, useState } from 'react'

const Topbar = () => {
    const [name, setName] = useState("");
    const [now, setNow] = useState(new Date());
    useEffect(()=>{
        setName(localStorage.getItem("username") || "User");
    },[])

     useEffect(() => {
       const timer = setInterval(() => {
         setNow(new Date());
       }, 60000); // 1 minute

       return () => clearInterval(timer);
     }, []);

     const istTime = new Date(
       now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
     );

     const hours = istTime.getHours();

     // Salutation logic
     let greeting = "Good Evening";
     if (hours >= 5 && hours < 12) greeting = "Good Morning";
     else if (hours >= 12 && hours < 17) greeting = "Good Afternoon";
  return (
    <div className='flex justify-between p-2'>
        <div className='flex flex-col '>
            <span className='text-(--text-secondary)'>{greeting}</span>
            <span className='text-(--text) text-xl font-bold'>{name}</span>
        </div>
        <div className='text-(--text-secondary) text-2xl bg-(--surface) rounded-full p-2 flex h-10 w-10 justify-center items-center'>
            <span>
                {name.slice(0,1)}
            </span>
        </div>
    </div>
  )
}

export default Topbar