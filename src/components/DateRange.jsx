import DateButton from "./DateButton";
import dateRanges from "../../data/dates/ranges.json";

export default function DateRange({ handleSetDateRange, selectedDateRange }) {
  return (
    <div
      className="btn-group btn-group-verticallg:btn-group-horizontal p-5 w-fit"
      onClick={handleSetDateRange}
    >
      {dateRanges.predefined.map(({ display, unit, previous }) => (
        <DateButton
          key={display}
          display={display}
          unit={unit}
          previous={previous}
          selectedDateRange={selectedDateRange}
        />
      ))}
    </div>
  );
}
