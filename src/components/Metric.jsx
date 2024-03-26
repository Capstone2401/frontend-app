import Dropdown from "./Dropdown";

export default function Metric({
  availableEvents,
  handleSetSelectedEvent,
  handleSetSelectedAggregation,
}) {
  const aggregationTypes = [
    "Total",
    "Average per user",
    "Median per user",
    "Min per user",
    "Max per user",
  ];

  return (
    <div className="border border-gray-400 rounded-md flex flex-col gap-8 w-full p-5">
      <div>
        <Dropdown
          text={"Events"}
          items={availableEvents}
          handleSetSelection={handleSetSelectedEvent}
        />
      </div>
      <div>
        <Dropdown
          text={"Aggregation"}
          items={aggregationTypes}
          handleSetSelection={handleSetSelectedAggregation}
        />
      </div>
    </div>
  );
}
