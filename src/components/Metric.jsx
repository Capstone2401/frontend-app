import { useState, useEffect } from "react";
import aggregationOptions from "../../data/dropdowns/aggregations.json";
import eventOptions from "../../data/dropdowns/events.json";
import InfoService from "../services/info";

import Dropdown from "./Dropdown";

export default function Metric({
  owner,
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
      <div className="border border-neutral-600 bg-base-300 rounded-md flex flex-col gap-8 xl:w-full w-[400px]  p-5">
        <div>
          <Dropdown
            dropDownType={"event"}
            owner={owner}
            defaultDisplay={defaultDisplayEvents}
            items={availableEvents}
            selection={selectedEvent}
            handleSetSelection={handleSetSelectedEvent}
          />
        </div>
        <div>
          <Dropdown
            dropDownType={"aggregation"}
            owner={owner}
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
