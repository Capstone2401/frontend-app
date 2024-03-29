import DateButton from "./DateButton";

export default function DateRange({ handleSetDateRange }) {
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
    <div
      className="btn-group btn-group-verticallg:btn-group-horizontal p-5 w-fit"
      onClick={() => handleSetDateRange()}
    >
      {BACKEND_ACCEPTED_DATE_RANGES.map((option) => (
        <DateButton key={option} content={option} />
      ))}
    </div>
  );
}
