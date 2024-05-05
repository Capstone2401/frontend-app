import Filter from "./Filter";
import Metric from "./Metric";

export default function Query({
  queryIdx,
  defaultQueryState,
  handleDropdownSelection,
  handleSetSelectedFilters,
  handleSetQueryEls,
  queryState,
  queryCount,
}) {
  return (
    <div key={queryIdx} data-data={queryIdx}>
      <section className="flex flex-col items-center">
        <div className="flex flex-1 justify-between w-[400px] xl:w-full pb-2">
          <h2 className="xl:w-full w-[400px]">
            Query{queryIdx > 0 ? ` ${queryIdx + 1}` : ""}
          </h2>
          <fieldset className="flex gap-2">
            <button
              className={`${queryCount <= 1 ? "disbaled: opacity-50" : ""} transition ease-in-out duration-150 hover:opacity-65 hover:cusor-pointer text-sm self-center font-semibold py-0.5 px-1.5 rounded`}
              onClick={(e) => handleSetQueryEls(e, { delete: true }, queryIdx)}
              disabled={queryCount <= 1}
            >
              x
            </button>
            {queryIdx === queryCount - 1 ? (
              <button
                className={`${queryCount >= 3 ? "disbaled: opacity-50" : ""} transition ease-in-out duration-150 hover:opacity-65 hover:cusor-pointer text-sm self-center font-semibold bg-neutral-700 py-0.5 px-1.5 rounded`}
                onClick={(e) => handleSetQueryEls(e, { add: true }, queryIdx)}
                disabled={queryCount >= 3}
              >
                +
              </button>
            ) : null}
          </fieldset>
        </div>
        <Metric
          owner={queryIdx}
          selectedEvent={(queryState[queryIdx] || defaultQueryState).event}
          selectedAggregation={
            (queryState[queryIdx] || defaultQueryState).aggregation
          }
          handleSetSelectedEvent={handleDropdownSelection}
          handleSetSelectedAggregation={handleDropdownSelection}
        />
      </section>
      <section>
        <Filter
          owner={queryIdx}
          handleSetSelectedFilters={handleSetSelectedFilters}
          selectedFilters={(queryState[queryIdx] || defaultQueryState).filters}
        />
      </section>
    </div>
  );
}
