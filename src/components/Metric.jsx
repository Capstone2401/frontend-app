import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

export default function Metric({
  selectedEvent,
  selectedAggregation,
  handleSetSelectedEvent,
  handleSetSelectedAggregation,
}) {
  const [availableEvents, setAvailableEvents] = useState([]);
  const defaultTitleEvents = "Events";
  const defaultTitleAggregations = "Aggregation";

  useEffect(() => {
    const result = {
      data: [
        { title: "All events" },
        { title: "Login" },
        { title: "Signup" },
        { title: "Page view" },
      ],
    };

    setAvailableEvents(result.data);
  }, []);

  const aggregationTypes = [
    { aggregation: "total", title: "Total" },
    { aggregation: "average", title: "Per user: Average" },
    { aggregation: "median", title: "Per user: Median" },
    { aggregation: "minimum", title: "Per user: Minimum" },
    { aggregation: "maximum", title: "Per user: Maximum" },
  ];

  return (
    <div className="border border-gray-400 rounded-md flex flex-col gap-8 w-full p-5">
      <div>
        <Dropdown
          defaultTitle={defaultTitleEvents}
          items={availableEvents}
          selection={selectedEvent}
          handleSetSelection={handleSetSelectedEvent}
        />
      </div>
      <div>
        <Dropdown
          defaultTitle={defaultTitleAggregations}
          items={aggregationTypes}
          selection={selectedAggregation}
          handleSetSelection={handleSetSelectedAggregation}
        />
      </div>
    </div>
  );
}
