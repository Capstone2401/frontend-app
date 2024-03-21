export default function Metric({ availableEvents, setSelectedEvent }) {
  return (
    <div>
      <select onChange={() => setSelectedEvent(this.value)}>
        {availableEvents.map((event) => (
          <option key={event} value={event}>
            {event}
          </option>
        ))}
      </select>
    </div>
  );
}
