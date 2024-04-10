import { useCallback } from "react";
import { useQueryReducer } from "../hooks/query";
import "../App.css";

import QueryBuilder from "./QueryBuilder";
import QueryResult from "./QueryResult";

function App() {
  const [queryState, dispatch] = useQueryReducer();

  const handleUpdateQueryState = useCallback(
    ({ type, payload }) => {
      dispatch({ type, payload });
    },
    [dispatch],
  );

  return (
    <div className="flex flex-col justify-between h-full p-10 bg-base-100">
      <header className="border-b border-b-neutral-600 pb-10">DataLoaf</header>
      <main className="flex flex-1 justify-between px-20  h-full">
        <QueryBuilder handleUpdateQueryState={handleUpdateQueryState} />
        <QueryResult
          queryData={queryState.data}
          isLoading={queryState.isLoading}
        />
      </main>
      <footer>Copyright stuff 2024</footer>
    </div>
  );
}

export default App;
