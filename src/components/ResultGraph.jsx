import {
  LineChart,
  Line,
  Area,
  AreaChart,
  Bar,
  BarChart,
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
          backgroundColor: "rgba(50, 50, 50, 0.90)",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p>{`${label}`}</p>
        {payload.map((item, index) => (
          <p
            style={{ color: item.color }}
            key={index}
          >{`Query ${index + 1} ${aggregationType}: ${item.value}`}</p>
        ))}
      </ResponsiveContainer>
    );
  }
};

const Graph = ({ queryData, chartType }) => {
  console.log(queryData);
  const colorMap = [
    "#F1D492", // Similar to the provided color
    "#FFA200", // Brighter orange
    "#ff6000", // Darker orange
  ];

  const formatQueryDataValues = (dataItem) => {
    if (!dataItem.values || dataItem.values.length < 1) return;
    const formattedValues = dataItem.values.map((item) => ({
      [timeUnit]: item[timeUnit].replace("T", " ").replace("Z", ""),
      [dataItem.aggregationType]: item[dataItem.aggregationType],
    }));

    return formattedValues;
  };

  let CurrentChart;
  let CurrentChartItem;

  switch (true) {
    case chartType.line:
      CurrentChart = LineChart;
      CurrentChartItem = Line;
      break;
    case chartType.bar:
      CurrentChart = BarChart;
      CurrentChartItem = Bar;
      break;
    case chartType.area:
      CurrentChart = AreaChart;
      CurrentChartItem = Area;
      break;
  }

  const timeUnit = queryData[0]?.timeUnit;
  const aggregationType = queryData[0]?.aggregationType;

  return (
    <ResponsiveContainer
      width="80%"
      minWidth="1000px"
      height="70%"
      minHeight="600px"
      className="mx-auto"
    >
      <CurrentChart
        style={{
          backgroundColor:
            "var(--fallback-b3, oklch(var(--b3) / var(--tw-bg-opacity)))",
          borderRadius: "0.375rem",
          padding: "2rem",
          boxShadow: "0px 10px 25px -2px rgba(0,0,0,0.40)",
        }}
        data={chartType.bar ? [] : null} // empty array workaround for known bar chart bug
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey={timeUnit}
          stroke="#ccc"
          allowDuplicatedCategory={false}
        />
        <YAxis stroke="#ccc" dataKey={aggregationType} />
        <Tooltip
          cursor={chartType.bar ? false : true}
          content={
            <CustomTooltip
              timeUnit={timeUnit}
              aggregationType={aggregationType}
            />
          }
        />
        {queryData.map((dataItem, index) => {
          return (
            <CurrentChartItem
              name={`Query${index + 1 > 1 ? " " + Number(index + 1) + ": " : ": "}${dataItem.aggregationType}`}
              key={index}
              type="monotone"
              dataKey={dataItem.aggregationType}
              data={formatQueryDataValues(dataItem)}
              stroke={colorMap[index]}
              fill={colorMap[index]}
            />
          );
        })}
        {/* show legend if any query data */}
        {queryData[0].values.length > 0 ? <Legend /> : null}{" "}
      </CurrentChart>
    </ResponsiveContainer>
  );
};

export default Graph;
