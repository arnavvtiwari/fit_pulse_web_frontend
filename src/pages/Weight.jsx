import React from 'react'
import Databox from '../components/Databox'
import StrengthChart from '../components/StregthCharts'
import { useCurrentWeightQuery, useWeightListQuery } from '../features/weight/weightApi'
import Navbar from '../components/Navbar'

const Weight = () => {
    const { data : weightList } = useWeightListQuery()
    const { data : currentWeight } = useCurrentWeightQuery()
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
        <StrengthChart records={weightList?.data} />
      </div>
    </div>
  );
}

export default Weight