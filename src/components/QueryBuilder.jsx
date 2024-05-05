import { useState, useEffect } from "react";
import dateRanges from "../../data/dates/ranges";
import Query from "./Query";
import QueryService from "../services/query";
import DateRange from "./DateRange";

export default function QueryBuilder({ handleUpdateQueryState }) {
  const [queryEls, setQueryEls] = useState([0]);
  const [selectedDateRange, setSelectedDateRange] = useState(
    dateRanges.default || {},
  );

  const defaultQueryState = {
    event: { value: "", display: "" },
    aggregation: { value: "", display: "", category: "" },
    filters: { events: {}, users: {} },
  };

  const [queryState, setQuery] = useState([defaultQueryState]);

  useEffect(() => {
    let controller = new AbortController();
    const { signal } = controller;

    const performRequest = async (data) => {
      handleUpdateQueryState({ type: "FETCH_START", loading: true });

      const body = {
        filters: data.filters,
        eventName: data.event.value === "all" ? null : data.event.value,
        aggregationType: data.aggregation.value,
        category: data.aggregation.category,
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
        const data = QueryService.eventsBy(body, options);
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const debounceRequests = (dataList) => {
      return new Promise((resolve) => {
        const checkValues = async () => {
          const allRequiredFieldsPresent = dataList.every(
            (data) => data.event.value && data.aggregation.value,
          );
          if (allRequiredFieldsPresent) {
            setTimeout(async () => {
              const promises = dataList.map((data) => performRequest(data));
              const data = await Promise.all(promises);
              return resolve(data);
            }, 500); // small debounce in case they spam filters
          }
        };

        checkValues();
      });
    };

    const fetchData = async () => {
      try {
        const queryData = await debounceRequests(queryState);
        handleUpdateQueryState({ type: "FETCH_SUCCESS", payload: queryData });
      } catch (error) {
        if (!signal.aborted) {
          handleUpdateQueryState({ type: "FETCH_ERROR", payload: error });
        }
        console.error(error);
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Abort ongoing calls if new one is made
      controller = new AbortController(); // Reset controller for future requests
    };
  }, [selectedDateRange, handleUpdateQueryState, queryState]);

  const handleSetSelectedDateRange = (e) => {
    const selection = e.target.dataset;
    if (!selection.title) setSelectedDateRange(selection);
  };

  const handleSetSelectedFilters = (newFilters) => {
    const owner = newFilters.owner;
    delete newFilters.owner;

    const stateCopy = JSON.parse(JSON.stringify(queryState));
    stateCopy[owner] = stateCopy[owner] || {};
    stateCopy[owner].filters = stateCopy[owner].filters || {};
    const filterCopy = stateCopy[owner].filters;
    const category = "events" in newFilters ? "events" : "users";
    const data = newFilters[category];

    for (const attr in data) {
      const newValue = data[attr];

      filterCopy[category] = filterCopy[category] || {};
      filterCopy[category][attr] = filterCopy[category][attr] || [];

      if (!filterCopy[category][attr].includes(newValue)) {
        filterCopy[category][attr].push(newValue);
      } else {
        filterCopy[category][attr].splice(
          filterCopy[category][attr].indexOf(newValue),
          1,
        );
        if (filterCopy[category][attr].length < 1) {
          delete filterCopy[category][attr]; // remove any empty filter arrays
        }
      }
    }

    stateCopy[owner].filters = filterCopy;
    setQuery(() => stateCopy);
  };

  const handleDropdownSelection = (e) => {
    if (!e.currentTarget.dataset.owner) return;
    const dropDown = e.currentTarget;
    dropDown.blur();

    const selection = e.target.dataset;
    const copyState = JSON.parse(JSON.stringify(queryState));
    if (!copyState[dropDown.dataset.owner]) {
      copyState[dropDown.dataset.owner] = {
        event: {},
        aggregation: {},
        filters: {},
      };
    }
    copyState[dropDown.dataset.owner][dropDown.dataset.dropdowntype] =
      selection;
    setQuery(copyState);
  };

  const handleSetQueryEls = (_e, command, queryIdx) => {
    const nextIdx = queryEls.length - 1;
    if (command.add) {
      setQueryEls(() => queryEls.concat(nextIdx + 1));
    }

    if (command.delete) {
      const copyDisplay = [...queryEls];
      const copyState = JSON.parse(JSON.stringify(queryState));
      copyDisplay.splice(queryIdx, 1);
      copyState.splice(queryIdx, 1);

      setQueryEls(() => copyDisplay);
      setQuery(() => copyState);
    }
  };

  return (
    <section className="mr-0 xl:mr-20 min-w-[505px] max-w-1/4 xl:pr-20 xl:py-10 pt-10 h-full rounded-sm flex flex-col justify-start gap-10 bg-base-100 xl:border-r border-r-neutral-600">
      <article className="mx-auto">
        <DateRange
          handleSetDateRange={handleSetSelectedDateRange}
          selectedDateRange={selectedDateRange}
        />
      </article>
      {queryEls.map((_, idx) => (
        <Query
          key={idx}
          defaultQueryState={defaultQueryState}
          queryState={queryState}
          handleSetQueryEls={handleSetQueryEls}
          handleSetSelectedFilters={handleSetSelectedFilters}
          handleDropdownSelection={handleDropdownSelection}
          queryIdx={idx}
          queryCount={queryEls.length}
        />
      ))}
    </section>
  );
}
