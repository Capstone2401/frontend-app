import { useState, useEffect } from "react";
import axios from "axios";
// import "./App.css";

import QueryBuilder from "./QueryBuilder";
import QueryResult from "./QueryResult";

function App() {
  const [availableEvents, setAvailableEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [queryData, setQueryData] = useState([]);
  const [dateRange, setDateRange] = useState("7D");

  useEffect(() => {
    axios.get("http://localhost:3000/allEventNames").then((response) => {
      setAvailableEvents(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedEvent === null) return;
    axios
      .get(`http://localhost:3000/events`, {
        params: {
          event_name: selectedEvent,
          date_range: dateRange,
        },
      })
      .then((response) => {
        setQueryData(response.data);
      });
  }, [selectedEvent, dateRange]); // TODO selectedFilter yet to be implemented

  return (
    <>
      <QueryBuilder
        availableEvents={availableEvents}
        setSelectedEvent={setSelectedEvent}
        setPrevious={setDateRange}
      />
      <QueryResult queryData={queryData} />
    </>
  );
}

export default App;
