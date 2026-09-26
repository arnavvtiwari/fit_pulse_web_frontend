import React, { useEffect, useState } from 'react'

const WorkoutCard = ({name, category, weight, date}) => {
    const [dateVar, setDateVar] = useState("")
    useEffect(() => {
      const workoutDate = new Date(date);
      const today = new Date();

      const isToday =
        workoutDate.getFullYear() === today.getFullYear() &&
        workoutDate.getMonth() === today.getMonth() &&
        workoutDate.getDate() === today.getDate();

      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const isYesterday =
        workoutDate.getFullYear() === yesterday.getFullYear() &&
        workoutDate.getMonth() === yesterday.getMonth() &&
        workoutDate.getDate() === yesterday.getDate();

      if (isToday) {
        setDateVar("Today");
      } else if (isYesterday) {
        setDateVar("Yesterday");
      } else {
        setDateVar(
          workoutDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        );
      }
    }, [date]);
  return (
    <div className='bg-(--surface) flex justify-between border border-(--line) rounded-lg p-4 items-center'>
        <div className='flex flex-col'>
            <span className='text-(--text)'>{name}</span>
            <div className='flex gap-2 text-(--text-secondary)'>
                <span>{category}</span>
                <span>.</span>
                <span>{weight}</span>
            </div>
        </div>
        <span className='text-(--text-secondary)'>{dateVar}</span>
    </div>
  )
}

export default WorkoutCard