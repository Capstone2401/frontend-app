import { useCallback } from "react";
import { useQueryReducer } from "../hooks/query";
import "../App.css";

import QueryBuilder from "./QueryBuilder";
import QueryResult from "./QueryResult";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  const [queryState, dispatch] = useQueryReducer();

  const handleUpdateQueryState = useCallback(
    ({ type, payload }) => {
      dispatch({ type, payload });
    },
    [dispatch],
  );

  return (
    <div className="flex flex-col justify-between h-full px-8 py-6 bg-base-100">
      <Header />
      <main className="overflow-auto flex flex-1 xl:items-start xl:justify-between items-center xl:flex-row flex-col px-20 h-full">
        <QueryBuilder handleUpdateQueryState={handleUpdateQueryState} />
        <QueryResult
          queryData={queryState.data}
          isLoading={queryState.isLoading}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
