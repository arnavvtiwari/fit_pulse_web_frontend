import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const StrengthChart = ({records = []}) => {

  const data = [...records].reverse().map((record) => ({
    date: new Date(record.createdAt).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    weight: Number(record.weight),
    reps: Number(record.reps),
  }));
  const minWeight = Math.floor(Math.min(...data.map(item => item.weight)));
  const maxWeight = Math.ceil(Math.max(...data.map((item => item.weight))));
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}

          <XAxis dataKey="date" hide/>

          <YAxis width={30} domain={[minWeight,maxWeight]} hide/>

          <Tooltip />

          <Line
            type="monotone"
            dataKey="weight"
            stroke="var(--accent)"
            strokeWidth={3}
            dot={false}
            activeDot={false}
            dominantBaseline=""
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StrengthChart;
