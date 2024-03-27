import { useState, useEffect } from "react";
import Metric from "./Metric";
import Filter from "./Filter";
import DateRange from "./DateRange";

export default function QueryBuilder() {
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedAggregation, setSelectedAggregation] = useState({});
  const [currentFilter, setCurrentFilter] = useState({});
  const handleSetFilter = (newFilters) => {
    setCurrentFilter({ ...currentFilter, newFilters });
  };

  const createSelectionHandler = (setter) => {
    return (item, dropDown) => {
      const selection = item;
      dropDown.current.blur();

      setter(selection);
    };
  };

  return (
    <section className="w-1/4 rounded-md border border-black shadow-2xl flex flex-col justify-start p-10 bg-base-100">
      <article>
        <h2>Metric</h2>
        <Metric
          selectedEvent={selectedEvent}
          selectedAggregation={selectedAggregation}
          handleSetSelectedEvent={createSelectionHandler(setSelectedEvent)}
          handleSetSelectedAggregation={createSelectionHandler(
            setSelectedAggregation,
          )}
        />
      </article>
      <article className="filters">
        <Filter handleSetFilter={handleSetFilter} />
      </article>
      <article className="date-picker">
        <DateRange />
      </article>
    </section>
  );
}
