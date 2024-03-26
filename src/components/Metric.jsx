import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

export default function Metric() {
  const [availableEvents, setAvailableEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedAggregation, setSelectedAggregation] = useState({});

  const createSelectionHandler = (setter) => {
    return (item, dropDown) => {
      const selection = item;
      dropDown.current.blur();

      setter(selection);
    };
  };

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
          defaultText={"Events"}
          items={availableEvents}
          selection={selectedEvent}
          handleSetSelection={createSelectionHandler(setSelectedEvent)}
        />
      </div>
      <div>
        <Dropdown
          defaultText={"Aggregation"}
          items={aggregationTypes}
          selection={selectedAggregation}
          handleSetSelection={createSelectionHandler(setSelectedAggregation)}
        />
      </div>
    </div>
  );
}
