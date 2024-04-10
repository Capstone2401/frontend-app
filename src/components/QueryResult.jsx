import ResultGraph from "./ResultGraph";

export default function QueryResult({ queryData, isLoading }) {
  if (isLoading) {
    return (
      <div className="m-auto">
        <p className="loading loading-spinner loading-lg text-primary"></p>
      </div>
    );
  }

  return (
    <>
      <ResultGraph queryData={queryData} />
    </>
  );
}
