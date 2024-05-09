import Filter from "./Filter";
import Metric from "./Metric";

export default function Query({
  queryId,
  queryIdx,
  defaultQueryState,
  handleDropdownSelection,
  handleSetSelectedFilters,
  handleSetQueryEls,
  queryState,
  queryCount,
}) {
  return (
    <div key={queryId}>
      <section className="flex flex-col items-center">
        <div className="flex flex-1 justify-between w-[400px] xl:w-full pb-2">
          <h2 className="xl:w-full w-[400px]">
            Query{queryIdx > 0 ? ` ${queryIdx + 1}` : ""}
          </h2>
          <fieldset className="flex gap-2">
            <button
              className={`${queryCount <= 1 ? "disbaled: opacity-50" : ""} transition ease-in-out duration-150 hover:opacity-65 hover:cusor-pointer text-sm self-center font-semibold py-0.5 px-1.5 rounded`}
              onClick={(e) => handleSetQueryEls(e, { delete: true }, queryId)}
              disabled={queryCount <= 1}
            >
              x
            </button>
            <button
              className={`${queryCount >= 3 ? "disbaled: opacity-50" : ""} transition ease-in-out duration-150 hover:opacity-65 hover:cusor-pointer text-sm self-center font-semibold bg-neutral-700 py-0.5 px-1.5 rounded`}
              onClick={(e) => handleSetQueryEls(e, { add: true }, queryId)}
              disabled={queryCount >= 3}
            >
              +
            </button>
          </fieldset>
        </div>
        <Metric
          owner={queryId}
          selectedEvent={(queryState[queryId] || defaultQueryState).event}
          selectedAggregation={
            (queryState[queryId] || defaultQueryState).aggregation
          }
          handleSetSelectedEvent={handleDropdownSelection}
          handleSetSelectedAggregation={handleDropdownSelection}
        />
      </section>
      <section>
        <Filter
          owner={queryId}
          handleSetSelectedFilters={handleSetSelectedFilters}
          selectedFilters={(queryState[queryId] || defaultQueryState).filters}
        />
      </section>
    </div>
  );
}
