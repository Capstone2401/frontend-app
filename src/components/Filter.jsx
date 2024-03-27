import FilterDropdown from "./FilterDropdown";

export default function Filter({ handleSetFilter }) {
  const mockData = {
    device: ["desktop", "iPhone", "Mac"],
    city: ["Boston", "New york"],
  };

  return (
    <div className="p-5 w-full">
      <FilterDropdown
        items={mockData}
        text={"Filter"}
        handleSetFilter={handleSetFilter}
      />
    </div>
  );
}
