import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

import QueryBuilder from "./QueryBuilder";
import QueryResult from "./QueryResult";

function App() {
  const [queryData, setQueryData] = useState([]);

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
      <main className="flex flex-1 px-20 py-10 h-full">
        <QueryBuilder />
        <QueryResult queryData={queryData} />
      </main>
      <footer>Copyright stuff 2024</footer>
    </div>
  );
}

export default App;
