import { useState, useCallback } from "react";
import "../App.css";

import QueryBuilder from "./QueryBuilder";
import QueryResult from "./QueryResult";

function App() {
  const [queryData, setQueryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSetLoading = useCallback((value) => {
    setLoading(value);
  }, []);

  const handleSetQueryData = useCallback((data) => {
    const copy = [...data].reverse();
    copy.forEach((record) => {
      record.value = record.calculated_value;
      delete record.calculated_value;
    });
    setQueryData(copy);
  }, []);

  return (
    <div className="flex flex-col justify-between h-full p-10 bg-base-100">
      <header className="border-b border-b-neutral-600 pb-10">DataLoaf</header>
      <main className="flex flex-1 justify-between px-20  h-full">
        <QueryBuilder
          handleSetQueryData={handleSetQueryData}
          handleSetLoading={handleSetLoading}
        />
        <QueryResult queryData={queryData} loading={loading} />
      </main>
      <footer>Copyright stuff 2024</footer>
    </div>
  );
}

export default App;
