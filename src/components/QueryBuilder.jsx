import { useState, useEffect } from "react";
import Metric from "./Metric";
import Filter from "./Filter";
import DateRange from "./DateRange";

export default function QueryBuilder() {
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedAggregation, setSelectedAggregation] = useState({});
  const [currentFilter, setCurrentFilter] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let abortController = new AbortController();

    const performRequest = async () => {
      setLoading(true);

      try {
        // Simulated network request (replace with your actual query)
        const response = await fetch("https://catfact.ninja/fact", {
          signal: abortController.signal,
        });
        const data = await response.json();
        if (isMounted) {
          console.log("Response:", data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const debouncedRequest = setTimeout(async () => {
      if (!selectedEvent.title) return;
      await performRequest();
    }, 2500);

    return () => {
      clearTimeout(debouncedRequest);
      isMounted = false;
      abortController.abort();
      abortController = new AbortController();
    };
  }, [selectedEvent, selectedAggregation, currentFilter]);

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
