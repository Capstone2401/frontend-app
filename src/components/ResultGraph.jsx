import { useRef } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, timeUnit }) => {
  if (active && payload && payload.length) {
    return (
      <ResponsiveContainer
        className="custom-tooltip"
        style={{
          padding: "5px",
          borderRadius: "0.375rem",
          backgroundColor: "rgb(255, 255, 255, .10)",
        }}
      >
        <p>{`${timeUnit}: ${payload[0].payload[timeUnit]}`}</p>
        <p>{`Value: ${payload[0].value}`}</p>
      </ResponsiveContainer>
    );
  }

  return null;
};

export default function Graph({ queryData }) {
  const parentRef = useRef(null);

  const getTimeUnit = (queryData) => {
    if (!queryData || queryData.length < 1) return;
    const record = queryData[0];

    switch (true) {
      case !!record.hour:
        return "hour";
      case !!record.day:
        return "day";
      case !!record.month:
        return "month";
    }
  };

  const formatQueryData = (queryData, timeUnit) => {
    return queryData && Object.keys(queryData).length > 0
      ? queryData.map((item) => ({
          value: item.value,
          [timeUnit]: item[timeUnit].replace("T", " ").replace("Z", ""),
        }))
      : null;
  };

  const timeUnit = getTimeUnit(queryData);
  const formattedQueryData = formatQueryData(queryData, timeUnit);

  return (
    <ResponsiveContainer
      width="60%"
      height="70%"
      style={{ paddingTop: "4rem" }}
      ref={parentRef}
    >
      <div x={500 / 2} y={20} textAnchor="middle" dominantBaseline="central">
        <div
          style={{
            color: "rgb(115 115 115)",
            fontStyle: "italic",
          }}
        >
          Result Window
        </div>
      </div>
      <LineChart
        width={500}
        height={400}
        data={formattedQueryData}
        style={{
          backgroundColor:
            "var(--fallback-b3, oklch(var(--b3) / var(--tw-bg-opacity)))",
          borderRadius: "0.375rem",
          padding: "2rem",
          marginTop: "1rem",
          boxShadow: "0px 10px 25px -2px rgba(0,0,0,0.40)",
        }}
      >
        <Line type="monotone" dataKey="value" stroke="#F1D492" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey={timeUnit} stroke="#ccc" />
        <YAxis dataKey="value" stroke="#ccc" />
        <Tooltip content={<CustomTooltip timeUnit={timeUnit} />} />
      </LineChart>
    </ResponsiveContainer>
  );
}
