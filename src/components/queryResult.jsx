import Table from "./table";
import Graph from "./graph";

export default queryResult = ({ queryData }) => {
  return (
    <Graph queryData={queryData} />
    // <Table queryData={queryData}/>
  );
};
