import { useState } from "react";
import ResultGraph from "./ResultGraph";
import AreaChartIcon from "./icons/AreaChart";
import BarChartIcon from "./icons/BarChart";
import LineChartIcon from "./icons/LineChart";

export default function QueryResult({ queryData, isLoading }) {
  const [chartType, setChartType] = useState({
    line: true,
    area: false,
    bar: false,
  });

  if (isLoading) {
    return (
      <div className="m-auto">
        <p className="loading loading-spinner loading-lg text-primary"></p>
      </div>
    );
  }

  const handleSetChartType = (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    const chartTypeCopy = { ...chartType };

    for (const chart in chartTypeCopy) {
      if (e.target.dataset.chart === chart) {
        chartTypeCopy[chart] = true;
      } else {
        chartTypeCopy[chart] = false;
      }
    }

    setChartType(chartTypeCopy);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="w-full h-full">
      <div className="mt-10 mb-2 m-auto flex flex-1 justify-between w-[80%]">
        <h2 className="text-neutral-400 italic self-end">Result Window:</h2>
        <fieldset onClick={handleSetChartType}>
          <button
            data-chart="line"
            className={`${chartType.line ? "bg-base-300 text-primary font-semibold" : "text-neutral-400"} border-l border-y text-neutral-400 border-neutral-600 p-1 rounded-l w-16`}
          >
            <LineChartIcon />
          </button>
          <button
            data-chart="area"
            className={`${chartType.area ? "bg-base-300 text-primary font-semibold" : "text-neutral-400"} border border-neutral-600 text-neutral-400 p-1 w-16`}
          >
            <AreaChartIcon />
          </button>
          <button
            data-chart="bar"
            className={`${chartType.bar ? "bg-base-300 text-primary font-semibold" : "text-neutral-400"} border-r border-y border-neutral-600 text-neutral-400 p-1 rounded-r w-16`}
          >
            <BarChartIcon />
          </button>
        </fieldset>
      </div>
      <ResultGraph queryData={queryData} chartType={chartType} />
    </div>
  );
}
