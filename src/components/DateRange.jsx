import DateButton from "./DateButton";

export default function DateRange({ handleSetDateRange, dateRange }) {
  const BACKEND_ACCEPTED_DATE_RANGES = [
    "Today",
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
      onClick={(e) => handleSetDateRange(e)}
    >
      {BACKEND_ACCEPTED_DATE_RANGES.map((option) => (
        <DateButton key={option} content={option} dateRange={dateRange} />
      ))}
    </div>
  );
}
