import DateButton from "./DateButton";

export default function DateRange() {
  const dateOptions = [];

  return (
    dateOptions.map(option => <DateButton key={option} content={option} />)
  )
}