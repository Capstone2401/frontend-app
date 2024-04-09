export default function DateButton({
  display,
  unit,
  previous,
  selectedDateRange,
}) {
  return (
    <button
      data-display={display}
      data-unit={unit}
      data-previous={previous}
      className={`btn ${display === selectedDateRange.display ? "bg-white bg-opacity-10" : "bg-base-300"} hover:bg-white hover:bg-opacity-10  p-3 mx-1`}
    >
      {display}
    </button>
  );
}
