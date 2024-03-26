import { useState } from "react";
import FilterDropdown from "./FilterDropdown";

export default function Filter() {
  const mockData = {
    device: ["desktop", "iPhone", "Mac"],
    city: ["Boston", "New york"],
  };
  const [selectedFilterAttribute, setFilterAttribute] = useState({});
  const [selectedFilterValue, setFilterValue] = useState({});

  const handleSetFilter = (attribute, value) => {
    setFilterAttribute(attribute);
    setFilterValue(value);
  };

  return (
    <div className="p-5 w-full">
      <FilterDropdown
        items={mockData}
        text={"Filter"}
        selectedFilterAttribute={selectedFilterAttribute}
        selectedFilterValue={selectedFilterValue}
        handleSetFilter={handleSetFilter}
      />
    </div>
  );
}
