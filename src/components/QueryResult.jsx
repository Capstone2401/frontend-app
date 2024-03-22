import ResultGraph from "./ResultGraph";
import ResultTable from "./ResultTable";

export default function QueryResult() {
  return (
    <>
      <ResultGraph queryData={queryData} />
      <ResultTable queryData={queryData} />
    </>
  )
}