import { useRef, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Graph({ queryData }) {
  const parentRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);

  useEffect(() => {
    if (parentRef.current) {
      const parentWidth = parentRef.current.offsetWidth;
      const parentHeight = parentRef.current.offsetHeight;
      const width = (2 / 3) * parentWidth; // Calculate two-thirds of parent's width
      const height = (3 / 4) * parentHeight;
      setChartWidth(width);
      setChartHeight(height);
    }
  }, []);

  return (
    <div className="w-3/4" ref={parentRef}>
      <LineChart width={chartWidth} height={chartHeight} data={queryData}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}
