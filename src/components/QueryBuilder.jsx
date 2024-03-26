import Metric from "./Metric";
import Filter from "./Filter";
import DateRange from "./DateRange";

export default function QueryBuilder({ availableEvents, setSelectedEvent }) {
  const mockData = ["Login", "Signup", "Page view"];
  return (
    <section>
      <article className="events">
        <Metric
          availableEvents={availableEvents}
          setSelectedEvent={setSelectedEvent}
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
