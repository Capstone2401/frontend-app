export default function DateButton({ content, dateRange }) {
  return (
    <button
      data-range={content}
      className={`btn ${content === dateRange ? "bg-white bg-opacity-10" : "bg-base-300"} hover:bg-white hover:bg-opacity-10  p-3 mx-1`}
    >
      {content}
    </button>
  );
}
