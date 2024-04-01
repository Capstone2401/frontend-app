import { useState, useEffect } from "react";
import axios from "axios";
import QueryService from "../services/query";
import Metric from "./Metric";
import Filter from "./Filter";
import DateRange from "./DateRange";

export default function QueryBuilder({ requestState, handleUpdateQueryState }) {
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedAggregation, setSelectedAggregation] = useState({});
  const [filters, setFilters] = useState({ events: {}, users: {} });
  const [dateRange, setDateRange] = useState("Today");

  useEffect(() => {
    let source = axios.CancelToken.source();

    const performRequest = async () => {
      handleUpdateQueryState({ type: "FETCH_START", loading: true });

      const body = {
        filters,
        eventName: selectedEvent.event === "all" ? null : selectedEvent.event,
        aggregationType: selectedAggregation.aggregation,
        category: selectedAggregation.category,
        dateRange,
      };

      const options = {
        cancelToken: source.token,
        headers: {
          "Content-Type": "application/json", // Make sure to set appropriate content type
        },
      };

      try {
        const data = await QueryService.eventsBy(body, options);
        handleUpdateQueryState({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        if (!axios.isCancel(error) && requestState.isLoading) {
          handleUpdateQueryState({ type: "FETCH_ERROR", payload: error });
        }
      }
    };

    const debouncedRequest = setTimeout(async () => {
      if (!selectedEvent.event || !selectedAggregation.aggregation) return;
      await performRequest();
    }, 1500);

    return () => {
      clearTimeout(debouncedRequest);
      source.cancel("Request cancelled due to component unmount");
      source = axios.CancelToken.source();
    };
  }, [
    selectedEvent,
    selectedAggregation,
    filters,
    dateRange,
    requestState,
    handleUpdateQueryState,
  ]);

  const handleSetFilter = (newFilters) => {
    let filterCopy = JSON.parse(JSON.stringify(filters));
    const category = Object.keys(newFilters)[0];
    const data = Object.values(newFilters)[0];

    for (const attr in data) {
      const newValue = data[attr];

      filterCopy[category][attr] = filterCopy[category][attr] || [];
      const currentValues = filterCopy[category][attr];

      if (!currentValues.includes(newValue)) {
        currentValues.push(newValue);
      } else {
        currentValues.splice(currentValues.indexOf(newValue), 1);
        if (currentValues.length < 1) {
          delete filterCopy[category][attr]; // remove any empty filter arrays
        }
      }
    }

    setFilters(() => filterCopy);
  };

  const handleSetDateRange = (e) => {
    const selection = e.target.dataset.range;
    setDateRange(selection);
  };

  const createSelectionHandler = (setter) => {
    return (e) => {
      const dropDown = e.currentTarget;
      dropDown.blur();

      const selection = e.target.dataset;
      setter(selection);
    };
  };

  return (
    <section className="w-1/4 rounded-sm flex flex-col justify-start p-10 bg-base-100 border-r border-r-neutral-600">
      <article>
        <DateRange
          handleSetDateRange={handleSetDateRange}
          dateRange={dateRange}
        />
      </article>
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
      <article>
        <Filter handleSetFilter={handleSetFilter} filters={filters} />
      </article>
    </section>
  );
}
