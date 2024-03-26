import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

import QueryBuilder from "./QueryBuilder";
import QueryResult from "./QueryResult";

function App() {
  const [availableEvents, setAvailableEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedAggregation, setSelectedAggregation] = useState(null);
  const [queryData, setQueryData] = useState([]);

  const createSelectionHandler = (setter) => {
    return (e) => {
      const selection = e.target.textContent;
      e.currentTarget.blur();

      setter(selection);
    };
  };

  useEffect(() => {
    const result = {
      data: [
        { eventName: "Login" },
        { eventName: "Signup" },
        { eventName: "Page view" },
      ],
    };

    setAvailableEvents(result.data.map(({ eventName }) => eventName));
  }, []);

  // useEffect(() => {
  //   if (selectedEvent === null) return;
  //   axios
  //     .get(`http://localhost:3000/queryResult?selectedEvent=${selectedEvent}`)
  //     .then((response) => {
  //       setQueryData(response.data);
  //     });
  // }, [selectedEvent]); // selectedFilter & Timeframe yet to be implemented

  return (
    <div className="flex flex-col justify-between h-full p-10">
      <header>DataLoaf</header>
      <main className="flex flex-1 p-20 h-full">
        <QueryBuilder
          availableEvents={availableEvents}
          handleSetSelectedEvent={createSelectionHandler(setSelectedEvent)}
          handleSetSelectedAggregation={createSelectionHandler(
            setSelectedAggregation,
          )}
        />
        <QueryResult queryData={queryData} />
      </main>
      <footer>Copyright stuff 2024</footer>
    </div>
  );
}

export default App;
