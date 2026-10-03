import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Databox from '../components/Databox'
import WorkoutCard from '../components/WorkoutCard'
import StrengthChart from '../components/StregthCharts'
import Modal from '../components/Modal'
import { useParams } from 'react-router-dom'
import {
  useGetWorkoutDetailsQuery,
  useCreateWorkoutRecordMutation,
} from "../features/workout/workoutApi"; 

const WorkoutDetails = () => {
    const [open, setOpen] = useState(false);
    const [createWorkoutRecord, {isLoading}] = useCreateWorkoutRecordMutation()
    const date = new Date().toISOString();
    const {id} = useParams();
    const [form, setForm] = useState({
        weight:'',
        repetitions:''
    })
    const { data } = useGetWorkoutDetailsQuery(id);
    const workout = data?.data || [];
    const records = workout?.records || [];
    const pr = records?.length
      ? Math.max(...records.map((record) => Number(record.weight)))
      : 0;
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await createWorkoutRecord({
          workoutId: id,
          reps: form.repetitions,
          weight: form.weight,
        }).unwrap();

        if (res.success) {
          setOpen(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <div className="bg-(--bg) min-h-screen flex flex-col p-4 gap-2 ">
      <Navbar name={"Bench Press"} />
      <span className="text-(--text-secondary)">Chest</span>
      <div className="grid grid-cols-2 gap-2">
        <Databox header="Current" data={`${records?.[0]?.weight ?? 0} kg`} />
        <Databox header={"PR"} data={`${pr} kg`} />
      </div>
      <div className="p-2 bg-(--surface)">
        <StrengthChart records={records}/>
      </div>
      <div className='flex flex-col gap-2'>
        <span className="text-(--text) font-bold text-xl">History</span>
        {records?.map((record)=>{
          return (
            <WorkoutCard
              name={"Bench Press"}
              category={record?.reps}
              weight={`${record?.weight}Kg`}
              date={record?.createdAt}
            />
          );
        })}
      </div>
      <button
        className="bg-(--accent) text-lg font-bold rounded-xl p-2 my-4"
        onClick={() => setOpen(true)}
      >
        + Log Workout
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-center w-full flex-col">
          <div className="flex justify-center">
            <span className="text-(--text-secondary)">Log Workout</span>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-(--text-secondary)">
                Weight
              </label>

              <input
                type="number"
                value={form.weight}
                placeholder='0.0'
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
                placeholder='0'
                value={form.repetitions}
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

export default WorkoutDetails