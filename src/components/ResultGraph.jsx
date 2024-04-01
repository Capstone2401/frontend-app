import { useRef, useState, useEffect } from "react";
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

  const timeUnit = getTimeUnit(queryData);

  return (
    <ResponsiveContainer width="70%" height="70%" ref={parentRef}>
      <LineChart
        width={500}
        height={400}
        data={queryData}
        style={{
          backgroundColor: "##231f1f",
          padding: "3rem",
          borderRadius: "0.375rem",
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
