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
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}

          <XAxis dataKey="date" />

          <YAxis width={30} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="weight"
            stroke="var(--accent)"
            strokeWidth={3}
            dot={{ fill: "var(--accent)" }}
            activeDot={{ fill: "var(--accent)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StrengthChart;
