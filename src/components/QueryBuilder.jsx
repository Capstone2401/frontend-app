import Metric from "./Metric";
import Filter from "./Filter";
import DateRange from "./DateRange";

export default function QueryBuilder({
  availableEvents,
  handleSetSelectedEvent,
}) {
  return (
    <section className="w-1/4 border border-black flex flex-col justify-start p-10 bg-base-100">
      <article>
        <Metric
          availableEvents={availableEvents}
          handleSetSelectedEvent={handleSetSelectedEvent}
        />
      </article>
      <article className="filters">
        <Filter />
      </article>
      <article className="date-picker">
        <DateRange />
      </article>
    </section>
  );
}
