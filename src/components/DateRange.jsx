import DateButton from "./DateButton";

export default function DateRange({ setDateRange }) {
  const BACKEND_ACCEPTED_DATE_RANGES = [
    "Today",
    "Yesterday",
    "7D",
    "30D",
    "3M",
    "6M",
    "12M",
  ];

  return (
    // TODO Indicate that the currently active previous is selected visually.
    <div onClick={() => setDateRange(this.value)}>
      {BACKEND_ACCEPTED_DATE_RANGES.map((option) => (
        <DateButton key={option} content={option} />
      ))}
    </div>
  );
}
