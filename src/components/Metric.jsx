import axios from "axios";
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
    const fetchEventNames = async () => {
      const response = await axios.get("/api/allEventNames");
      setAvailableEvents(() =>
        response.data.map((title) => {
          return { title };
        }),
      );
    };

    fetchEventNames();
  }, []);

  const aggregationTypes = [
    { category: "events", aggregation: "total", title: "Total Events" },
    { category: "users", aggregation: "total", title: "Unique Users" },
    { category: "events", aggregation: "average", title: "Per user: Average" },
    { category: "events", aggregation: "median", title: "Per user: Median" },
    { category: "events", aggregation: "minimum", title: "Per user: Minimum" },
    { category: "events", aggregation: "maximum", title: "Per user: Maximum" },
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
