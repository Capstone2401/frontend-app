import { useRef, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload, timeUnit }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "rgb(20, 20, 20)",
          padding: "5px",
          borderRadius: "0.5rem",
        }}
      >
        <p>{`${timeUnit}: ${payload[0].payload.month}`}</p>
        <p>{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function Graph({ queryData }) {
  const parentRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);

  useEffect(() => {
    if (parentRef.current) {
      const parentWidth = parentRef.current.offsetWidth;
      const parentHeight = parentRef.current.offsetHeight;
      const width = (2 / 3) * parentWidth;
      const height = (3 / 4) * parentHeight;
      setChartWidth(width);
      setChartHeight(height);
    }
  }, []);

  const getTimeUnit = (queryData) => {
    if (queryData.length < 1) return;
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

  let timeUnit = getTimeUnit(queryData);

  return (
    <div className="w-3/4" ref={parentRef}>
      <LineChart
        width={chartWidth}
        height={chartHeight}
        data={queryData}
        style={{
          backgroundColor: "#3C3838",
          padding: "3rem",
          borderRadius: "0.5rem",
          opacity: "100",
        }}
      >
        <Line type="monotone" dataKey="value" stroke="#F1D492" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey={timeUnit} stroke="#ccc" />
        <YAxis dataKey="value" stroke="#ccc" />
        <Tooltip content={<CustomTooltip timeUnit={timeUnit} />} />
      </LineChart>
    </div>
  );
}
