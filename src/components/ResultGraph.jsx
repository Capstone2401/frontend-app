import React, { useRef } from "react";
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

const CustomTooltip = ({ active, payload, label, aggregationType }) => {
  if (active && payload && payload.length) {
    return (
      <ResponsiveContainer
        className="custom-tooltip"
        style={{
          padding: "5px",
          borderRadius: "0.375rem",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          color: "black",
        }}
      >
        <p>{`${label}`}</p>
        {payload.map((item, index) => (
          <p key={index}>{`${aggregationType}: ${item.value}`}</p>
        ))}
      </ResponsiveContainer>
    );
  }
};

const Graph = ({ queryData }) => {
  const parentRef = useRef(null);

  const timeUnit = queryData[0].timeUnit;

  const formatQueryDataValues = (dataItem) => {
    if (!dataItem.values || dataItem.values.length < 1) return;
    const formattedValues = dataItem.values.map((item) => ({
      [timeUnit]: item[timeUnit].replace("T", " ").replace("Z", ""),
      [dataItem.aggregationType]: item[dataItem.aggregationType],
    }));

    return formattedValues;
  };

  const colorMap = [
    "#F1D492", // Similar to the provided color
    "#FFA200", // Brighter orange
    "#ff6000", // Darker orange
    "#724500", // Deep brown
    "#ffff00", // Bright yellow
  ];

  return (
    <ResponsiveContainer
      width="60%"
      minWidth="1000px"
      height="65%"
      minHeight="600px"
      style={{ paddingTop: "2.5rem" }}
      ref={parentRef}
      className="mx-auto"
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
        style={{
          backgroundColor:
            "var(--fallback-b3, oklch(var(--b3) / var(--tw-bg-opacity)))",
          borderRadius: "0.375rem",
          padding: "2rem",
          marginTop: "1rem",
          boxShadow: "0px 10px 25px -2px rgba(0,0,0,0.40)",
        }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey={timeUnit}
          stroke="#ccc"
          allowDuplicatedCategory={false}
        />
        <YAxis stroke="#ccc" dataKey={queryData.aggregationType} />
        <Tooltip
          content={
            <CustomTooltip
              timeUnit={timeUnit}
              aggregationType={queryData[0].aggregationType}
            />
          }
        />
        {queryData.map((dataItem, index) => {
          return (
            <Line
              name={`Query ${index + 1 > 1 ? index + 1 : ""}`}
              key={index}
              type="monotone"
              dataKey={dataItem.aggregationType}
              data={formatQueryDataValues(dataItem)}
              stroke={colorMap[index]} // random color
            />
          );
        })}
        {/* show legend if any query data */}
        {queryData[0].values.length > 0 ? <Legend /> : null}{" "}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
