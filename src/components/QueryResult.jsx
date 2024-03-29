import ResultGraph from "./ResultGraph";
import ResultTable from "./ResultTable";

export default function QueryResult({ queryData, loading }) {
  if (loading) {
    return (
      <div className="m-auto">
        <p className="loading loading-spinner loading-lg text-primary"></p>
      </div>
    );
  }

  return (
    <>
      <ResultGraph queryData={queryData} />
      <ResultTable queryData={queryData} />
    </>
  );
}
