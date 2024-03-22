import { useState, useEffect } from "react";
import axios from "axios";
// import "./App.css";

import QueryBuilder from "./QueryBuilder";
import QueryResult from "./QueryResult";

function App() {
  const [availableEvents, setAvailableEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [queryData, setQueryData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/configuredEvents").then((response) => {
      setAvailableEvents(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedEvent === null) return;
    axios
      .get(`http://localhost:3000/queryResult?selectedEvent=${selectedEvent}`)
      .then((response) => {
        setQueryData(response.data);
      });
  }, [selectedEvent]); // selectedFilter & Timeframe yet to be implemented

  return (
    <>
      <QueryBuilder
        availableEvents={availableEvents}
        setSelectedEvent={setSelectedEvent}
      />
      <QueryResult queryData={queryData} />
    </>
  );
}

export default App;
