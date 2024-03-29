import { useState, useEffect } from "react";
import axios from "axios";
import Metric from "./Metric";
import Filter from "./Filter";
import DateRange from "./DateRange";

export default function QueryBuilder({ handleSetQueryData, handleSetLoading }) {
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedAggregation, setSelectedAggregation] = useState({});
  const [filter, setFilter] = useState({ events: {}, users: {} });
  const [dateRange, setDateRange] = useState("3M");

  useEffect(() => {
    let isMounted = true;
    let source = axios.CancelToken.source();

    const performRequest = async () => {
      handleSetLoading(true);

      try {
        const response = await axios.post(
          `/api/query/${selectedAggregation.category}`,
          {
            filters: filter,
            eventName: selectedEvent.title,
            aggregationType: selectedAggregation.aggregation,
            category: selectedAggregation.category,
            dateRange: dateRange,
          },
          {
            cancelToken: source.token,
            headers: {
              "Content-Type": "application/json", // Make sure to set appropriate content type
            },
          },
        );

        const data = response.data;
        handleSetQueryData(data);

        if (isMounted) {
          handleSetLoading(false);
        }
      } catch (error) {
        if (!axios.isCancel(error) && isMounted) {
          handleSetLoading(false);
        }
      }
    };

    const debouncedRequest = setTimeout(async () => {
      if (!selectedEvent.title || !selectedAggregation.title) return;
      await performRequest();
    }, 2500);

    return () => {
      clearTimeout(debouncedRequest);
      isMounted = false;
      source.cancel("Request cancelled due to component unmount");
      source = axios.CancelToken.source();
    };
  }, [
    selectedEvent,
    selectedAggregation,
    filter,
    dateRange,
    handleSetQueryData,
    handleSetLoading,
  ]);

  const handleSetFilter = (newFilters) => {
    let filterCopy = JSON.parse(JSON.stringify(filter));
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

    setFilter(() => filterCopy);
  };

  const handleSetDateRange = (dateRange) => setDateRange(() => dateRange);

  const createSelectionHandler = (setter) => {
    return (item, dropDown) => {
      const selection = item;
      dropDown.current.blur();

      setter(selection);
    };
  };

  return (
    <section className="w-1/4 rounded-sm flex flex-col justify-start p-10 bg-base-100 border-r border-r-neutral-600">
      <article>
        <DateRange handleSetDateRange={handleSetDateRange} />
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
      <article className="filters">
        <Filter handleSetFilter={handleSetFilter} filter={filter} />
      </article>
    </section>
  );
}
