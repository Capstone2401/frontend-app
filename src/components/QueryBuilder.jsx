import Metric from "./Metric";
import Filter from "./Filter";
import DateRange from "./DateRange";

export default function QueryBuilder({ availableEvents }) {
  return (
    <section className="w-1/4 rounded-md border border-black shadow-2xl flex flex-col justify-start p-10 bg-base-100">
      <article>
        <h2>Metric</h2>
        <Metric availableEvents={availableEvents} />
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
