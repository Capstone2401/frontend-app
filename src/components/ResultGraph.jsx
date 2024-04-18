import { useRef } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, timeUnit, aggregationType }) => {
  if (active && payload && payload.length) {
    console.log(payload[0]);
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
        <p>{`${aggregationType}: ${payload[0].payload[aggregationType]}`}</p>
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

  const getAggregation = (queryData) => {
    if (!queryData || queryData.length < 1) return;
    const record = queryData[0];
    return record.aggregationType;
  };

  const formatQueryData = (queryData, timeUnit, aggregationType) => {
    return queryData && Object.keys(queryData).length > 0
      ? queryData.map((item) => ({
          [aggregationType]: item[item.aggregationType],
          [timeUnit]: item[timeUnit].replace("T", " ").replace("Z", ""),
        }))
      : null;
  };

  const timeUnit = getTimeUnit(queryData);
  const aggregationType = getAggregation(queryData);
  const formattedQueryData = formatQueryData(
    queryData,
    timeUnit,
    aggregationType,
  );

  return (
    <ResponsiveContainer
      width="60%"
      height="70%"
      style={{ paddingTop: "4rem" }}
      ref={parentRef}
    >
      <div textAnchor="middle" dominantBaseline="central">
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
        <Line type="monotone" dataKey={aggregationType} stroke="#F1D492" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey={timeUnit} stroke="#ccc" />
        {queryData ? <Legend /> : null}
        <YAxis dataKey={aggregationType} stroke="#ccc" />
        <Tooltip
          content={
            <CustomTooltip
              timeUnit={timeUnit}
              aggregationType={aggregationType}
            />
          }
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
