import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import dateRanges from "../../data/dates/ranges";
import Query from "./Query";
import QueryService from "../services/query";
import DateRange from "./DateRange";

export default function QueryBuilder({ handleUpdateQueryState }) {
  const [initialQueryId] = useState(uuidv4());
  const [queryIds, setQueryIds] = useState([initialQueryId]);
  const [selectedDateRange, setSelectedDateRange] = useState(
    dateRanges.default || {},
  );

  const defaultQueryState = {
    event: { value: "", display: "" },
    aggregation: { value: "", display: "", category: "" },
    filters: { events: {}, users: {} },
  };

  const [queryState, setQueryState] = useState({
    [initialQueryId]: defaultQueryState,
  });

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
        if (!signal.aborted) {
          handleUpdateQueryState({ type: "FETCH_ERROR", payload: error });
        }
        console.error(error);
      }
    };

    const debounceRequests = (queryState) => {
      return new Promise((resolve) => {
        // uses queryIds instead of keys of queryState to guarantee order in all JS versions
        const checkValues = async () => {
          const allRequiredFieldsPresent = queryIds.every((queryId) => {
            return (
              queryState[queryId]?.event.value &&
              queryState[queryId]?.aggregation.value
            );
          });

          if (allRequiredFieldsPresent) {
            setTimeout(async () => {
              try {
                const promises = queryIds.map((queryId) =>
                  performRequest(queryState[queryId]),
                );
                const data = await Promise.all(promises);
                return resolve(data);
              } catch (error) {
                if (error.name !== "CanceledError") {
                  // don't log if cancel from debounce
                  console.error(error);
                }

                throw error; // caught below and issues error to state via reducer
              }
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
        console.log(error);
        handleUpdateQueryState({ type: "FETCH_ERROR", payload: error });
        console.error(error);
      }
    };

    fetchData();

    /* eslint-disable react-hooks/exhaustive-deps */ // it wants queryIds here, but doing so causes unwanted behavior
    return () => {
      controller.abort(); // Abort ongoing calls if new one is made
      controller = new AbortController(); // Reset controller for future requests
    };
  }, [selectedDateRange, handleUpdateQueryState, queryState]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleSetSelectedDateRange = (e) => {
    const selection = e.target.dataset;
    if (!selection.title) setSelectedDateRange(selection);
  };

  const handleSetSelectedFilters = (newFilters) => {
    const owner = newFilters.owner;
    delete newFilters.owner;
    const stateCopy = JSON.parse(JSON.stringify(queryState));

    if (newFilters.reset) {
      stateCopy[owner].filters = { events: {}, users: {} };
      setQueryState(stateCopy);
      return;
    }

    stateCopy[owner] = stateCopy[owner] || {};
    stateCopy[owner].filters = stateCopy[owner].filters || {};
    const filterCopy = stateCopy[owner].filters;

    for (const category of ["events", "users"]) {
      for (const attr in newFilters[category]) {
        const newValue = newFilters[category][attr];

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
            delete filterCopy[category][attr];
          }
        }
      }
    }

    stateCopy[owner].filters = filterCopy;
    setQueryState(() => stateCopy);
  };

  const handleDropdownSelection = (e) => {
    if (!e.currentTarget.dataset.owner) return;
    const dropDown = e.currentTarget;
    dropDown.blur();

    const selection = e.target.dataset;
    const stateCopy = JSON.parse(JSON.stringify(queryState));
    if (!stateCopy[dropDown.dataset.owner]) {
      stateCopy[dropDown.dataset.owner] = {
        event: {},
        aggregation: {},
        filters: {},
      };
    }
    stateCopy[dropDown.dataset.owner][dropDown.dataset.dropdowntype] =
      selection;
    setQueryState(stateCopy);
  };

  const handleSetQueryIds = (_e, command, queryId) => {
    if (command.add) {
      setQueryIds(() => queryIds.concat(uuidv4()));
    }

    if (command.delete) {
      const queryIdsCopy = [...queryIds];
      const stateCopy = JSON.parse(JSON.stringify(queryState));
      queryIdsCopy.splice(queryIdsCopy.indexOf(queryId), 1);
      delete stateCopy[queryId];

      setQueryIds(() => queryIdsCopy);
      setQueryState(() => stateCopy);
    }
    console.log(queryState);
  };

  return (
    <section className="mr-0 xl:mr-20 min-w-[505px] max-w-1/4 xl:pr-20 xl:py-10 pt-10 xl:h-full h-[1000px] rounded-sm flex flex-col justify-start gap-10 bg-base-100 xl:border-r border-r-neutral-600">
      <article className="mx-auto">
        <DateRange
          handleSetDateRange={handleSetSelectedDateRange}
          selectedDateRange={selectedDateRange}
        />
      </article>
      {queryIds.map((queryId, idx) => (
        <Query
          key={queryId}
          defaultQueryState={defaultQueryState}
          queryState={queryState}
          handleSetQueryEls={handleSetQueryIds}
          handleSetSelectedFilters={handleSetSelectedFilters}
          handleDropdownSelection={handleDropdownSelection}
          queryIdx={idx} // index of array used to display 'Query 2..3' in UI
          queryId={queryId} // unique id to identify which query selections came from
          queryCount={queryIds.length}
        />
      ))}
    </section>
  );
}
