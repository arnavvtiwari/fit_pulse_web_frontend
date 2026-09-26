import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import Databox from '../components/Databox'
import WorkoutCard from '../components/WorkoutCard'
import Modal from '../components/Modal'
import { useCreateWorkoutMutation, useGetWorkoutsQuery } from '../features/workout/workoutApi'
import { useNavigate } from 'react-router-dom'

const Workouts = () => {
  const [open, setOpen] = useState(false)
  const date = new Date().toISOString()
  const [sessions, setSessions] = useState(0)
  const [createWorkout, {isLoading}] = useCreateWorkoutMutation();
  const navigate = useNavigate()
  const [form, setForm] = useState({
    weight: '',
    repetitions: '',
    name:'',
    category:''
  });
  
 const { data, isWorkoutLoading, isError } = useGetWorkoutsQuery();
 const workouts = data?.data || [];
 const calculateSessions = () =>{
  let count = 0;
  workouts?.map((workout)=>{
    count += workout?.records?.length;
  })
  setSessions(count);
 }
 useEffect(()=>{
  calculateSessions()
 },[workouts])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await createWorkout({
        name:form.name,
        category:form.category,
        reps:form.repetitions,
        weight:form.weight
      }).unwrap()
      // console.log(res.success)
      if(res.success){
        setOpen(false);
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="bg-(--bg) min-h-screen p-4 flex flex-col gap-2">
      <Topbar />
      <div className="grid grid-cols-2 gap-2">
        <Databox header={"Exercises"} data={workouts?.length} />
        <Databox header={"Sessions"} data={sessions} />
        <Databox header={"Body Weight"} data={'-'} />
        <Databox header={"PRs this month"} data={'-'} />
      </div>
      <button
        className="bg-(--accent) text-lg font-bold rounded-xl p-2 my-4"
        onClick={() => setOpen(true)}
      >
        + Add Workout
      </button>
      <div className="flex flex-col gap-2">
        <span className="text-(--text) font-bold">Recent Workouts</span>
        { workouts.length > 0 ? workouts.map((workout) => {
          return (
            <div
            onClick={()=>{navigate(`/details/${workout?.id}`)}}
            >
              <WorkoutCard
                name={workout?.name}
                category={workout?.category}
                weight={`${workout?.records[0].weight} kg`}
                date={workout?.records[0].createdAt}
              />
            </div>
          );
        }) :  ( <span className='text-(--text-secondary)'>No Workouts recorded yet</span>)}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-center w-full flex-col">
          <div className="flex justify-center">
            <span className="text-(--text-secondary)">Add Workout</span>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-(--text-secondary)">
                Name
              </label>

              <input
                type="text"
                value={form.name}
                placeholder="workout name"
                className="w-full rounded-lg bg-(--surface-input) px-3 py-2 outline-none transition text-(--text-secondary) focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-(--text-secondary)">
                Category
              </label>

              <input
                type="text"
                value={form.category}
                placeholder="muscle group"
                className="w-full rounded-lg bg-(--surface-input) px-3 py-2 outline-none transition text-(--text-secondary) focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }));
                }}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-(--text-secondary)">
                Weight
              </label>

              <input
                type="number"
                value={form.weight}
                placeholder="0.0"
                className="w-full rounded-lg bg-(--surface-input) px-3 py-2 outline-none transition text-(--text-secondary) focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    weight: e.target.value,
                  }));
                }}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-(--text-secondary)">
                Repetitions
              </label>
              <input
                type="number"
                value={form.repetitions}
                placeholder="0"
                className="w-full rounded-lg bg-(--surface-input) px-3 py-2 outline-none transition text-(--text-secondary) focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                onChange={(e) => {
                  setForm((prev) => ({
                    ...prev,
                    repetitions: e.target.value,
                  }));
                }}
              />
            </div>

            <button
              type="submit"
              //   disabled={isLoading}
              className="rounded-lg bg-(--accent) py-2.5 font-medium text-white transition"
            >
              {/* {isLoading ? "Logging in ...." : "Login"} */}
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Workouts