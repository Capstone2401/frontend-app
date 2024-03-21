import Metric from "./metric";

export default function QueryBuilder({ availableEvents, setSelectedEvent }) {
  return (
    <div>
      <div className="events">
        <Metric
          availableEvents={availableEvents}
          setSelectedEvent={setSelectedEvent}
        />
      </div>
      <div className="filters"></div>
    </div>
  );
}
