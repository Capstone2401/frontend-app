import { useState, useEffect } from "react";
import dateRanges from "../../data/dates/ranges";
import QueryService from "../services/query";
import Metric from "./Metric";
import Filter from "./Filter";
import DateRange from "./DateRange";

export default function QueryBuilder({ handleUpdateQueryState }) {
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedAggregation, setSelectedAggregation] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    events: {},
    users: {},
  });
  const [selectedDateRange, setSelectedDateRange] = useState(
    dateRanges.default || {},
  );

  useEffect(() => {
    let controller = new AbortController();
    const { signal } = controller;

    const performRequest = async () => {
      handleUpdateQueryState({ type: "FETCH_START", loading: true });

      const body = {
        filters: selectedFilters,
        eventName: selectedEvent.value === "all" ? null : selectedEvent.value,
        aggregationType: selectedAggregation.value,
        category: selectedAggregation.category,
        dateRange: {
          previous: selectedDateRange.previous,
          timeUnit: selectedDateRange.unit,
        },
      };

      const options = {
        signal,
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const data = await QueryService.eventsBy(body, options);
        handleUpdateQueryState({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        // if error is not an aborted request
        if (!signal.aborted) {
          handleUpdateQueryState({ type: "FETCH_ERROR", payload: error });
        }
      }
    };

    const debouncedRequest = setTimeout(async () => {
      if (!selectedEvent.value || !selectedAggregation.value) return;
      await performRequest();
    }, 1500);

    return () => {
      clearTimeout(debouncedRequest);
      controller.abort();
      controller = new AbortController();
    };
  }, [
    selectedEvent,
    selectedAggregation,
    selectedFilters,
    selectedDateRange,
    handleUpdateQueryState,
  ]);

  const handleSetSelectedFilters = (newFilters) => {
    const filterCopy = JSON.parse(JSON.stringify(selectedFilters));
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

    setSelectedFilters(() => filterCopy);
  };

  const handleSetSelectedDateRange = (e) => {
    const selection = e.target.dataset;
    setSelectedDateRange(selection);
  };

  const createDropdownSelectionHandler = (setter) => {
    return (e) => {
      const dropDown = e.currentTarget;
      dropDown.blur();

      const selection = e.target.dataset;
      setter(selection);
    };
  };

  return (
    <section className="mr-0 xl:mr-20 min-w-[505px] max-w-1/4 xl:pr-20 xl:py-10 pt-10 h-full rounded-sm flex flex-col justify-start gap-10 bg-base-100 xl:border-r border-r-neutral-600">
      <article className="mx-auto">
        <DateRange
          handleSetDateRange={handleSetSelectedDateRange}
          selectedDateRange={selectedDateRange}
        />
      </article>
      <article className="flex flex-col items-center">
        <h2 className="xl:w-full w-[400px] pb-1">Metric</h2>
        <Metric
          selectedEvent={selectedEvent}
          selectedAggregation={selectedAggregation}
          handleSetSelectedEvent={createDropdownSelectionHandler(
            setSelectedEvent,
          )}
          handleSetSelectedAggregation={createDropdownSelectionHandler(
            setSelectedAggregation,
          )}
        />
      </article>
      <article>
        <Filter
          handleSetSelectedFilters={handleSetSelectedFilters}
          selectedFilters={selectedFilters}
        />
      </article>
    </section>
  );
}
