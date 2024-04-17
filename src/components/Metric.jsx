import { useState, useEffect } from "react";
import aggregationOptions from "../../data/dropdowns/aggregations.json";
import eventOptions from "../../data/dropdowns/events.json";
import InfoService from "../services/info";

import Dropdown from "./Dropdown";

export default function Metric({
  selectedEvent,
  selectedAggregation,
  handleSetSelectedEvent,
  handleSetSelectedAggregation,
}) {
  const [availableEvents, setAvailableEvents] = useState([]);
  const defaultDisplayEvents = eventOptions.title;
  const defaultDisplayAggregations = aggregationOptions.title;
  const aggregationTypes = aggregationOptions.predefined;

  useEffect(() => {
    const defaultAvailableEvents = eventOptions.default || [];
    const fetchEventNames = async () => {
      try {
        const data = await InfoService.getAllEventNames();

        const formattedResponse = defaultAvailableEvents.concat(
          data.map((eventName) => ({
            display: eventName,
            value: eventName,
          })),
        );

        setAvailableEvents(formattedResponse);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEventNames();
  }, []);

  return (
    <>
      <div className="border border-neutral-500 rounded-md flex flex-col gap-8 w-4/5 min-w-40 p-5">
        <div>
          <Dropdown
            defaultDisplay={defaultDisplayEvents}
            items={availableEvents}
            selection={selectedEvent}
            handleSetSelection={handleSetSelectedEvent}
          />
        </div>
        <div>
          <Dropdown
            defaultDisplay={defaultDisplayAggregations}
            items={aggregationTypes}
            selection={selectedAggregation}
            handleSetSelection={handleSetSelectedAggregation}
          />
        </div>
      </div>
    </>
  );
}
