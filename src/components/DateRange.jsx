export default function DateRange({ setDateRange }) {
  return (
    // TODO Indicate that the currently active previous is selected visually.
    <div onClick={setDateRange(this.value)}>
      <button value={"Today"}>Today</button>
      <button value={"Yesterday"}>Yesterday</button>
      <button value={"Last7D"}>7D</button>
      <button value={"Last30D"}>30D</button>
      <button value={"Last3M"}>3M</button>
      <button value={"Last6M"}>6M</button>
      <button value={"Last12M"}>12M</button>
    </div>
  );
}
