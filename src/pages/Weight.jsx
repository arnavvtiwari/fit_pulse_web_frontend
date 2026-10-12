import React, { useState } from 'react'
import Databox from '../components/Databox'
import StrengthChart from '../components/StregthCharts'
import { useAddWeightMutation, useCurrentWeightQuery, useWeightListQuery } from '../features/weight/weightApi'
import Navbar from '../components/Navbar'
import WorkoutCard from '../components/WorkoutCard'
import Modal from '../components/Modal'

const Weight = () => {
    const { data : weightList } = useWeightListQuery()
    const { data : currentWeight } = useCurrentWeightQuery()
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({
      weight : 0.0
    })
    const [addWeight, {isLoading}] = useAddWeightMutation();
    const handleSubmit = async(e) =>{
      e.preventDefault();
      try {
        const res = await addWeight({
          weight: form.weight,
        }).unwrap();
        if (res.success) {
          setOpen(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  return (
    <div className="min-h-screen bg-(--bg) flex flex-col p-4 gap-2">
      <Navbar name={"Bodyweight"} />
      <div className="grid grid-cols-2 gap-2">
        <Databox
          header={"Current Weight"}
          data={`${currentWeight?.data?.weight} kg`}
        />
        <Databox header={"Change (30d)"} />
      </div>
      <div className="p-2 bg-(--surface)">
        <StrengthChart records={weightList?.data} yAxis = {true} xAxis={true}/>
      </div>
      <div className="flex w-full justify-center">
        <button
          className="bg-(--accent) w-full text-lg font-bold rounded-xl p-2 my-4"
          onClick={() => setOpen(true)}
        >
          + Log Workout
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-(--text) font-bold text-xl">History</span>
        {weightList?.data?.map((record) => {
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex justify-center w-full flex-col">
          <div className="flex justify-center">
            <span className="text-(--text-secondary)">Log Weight</span>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

export default Weight