import { useEffect, useState } from "react";
import FilterDropdown from "./FilterDropdown";
import InfoService from "../services/info";

export default function Filter({
  handleSetSelectedFilters,
  selectedFilters,
  owner,
}) {
  const [attributes, setAttributes] = useState({});

  useEffect(() => {
    const getAllAttributes = async () => {
      try {
        const response = await InfoService.getAllAttributes();
        setAttributes(response);
      } catch (error) {
        console.error(error);
      }
    };

    getAllAttributes();
  }, []);

  function formatFiltersToString(filters) {
    let formattedString = "";

    for (const filter of Object.values(filters)) {
      const filterEntries = Object.entries(filter);

      if (filterEntries.length === 0) {
        continue;
      }

      for (let i = 0; i < filterEntries.length; i++) {
        const [filterName, values] = filterEntries[i];
        formattedString += `${filterName.slice(0, 1).toUpperCase() + filterName.slice(1)}: ${values.join(", ")}`;

        const isLastValue = i === filterEntries.length - 1;
        if (!isLastValue) {
          formattedString += ", ";
        }
      }

      formattedString += " - ";
    }

    return formattedString.trim().slice(0, -2);
  }

  return (
    <div className="mt-4 xl:w-full w-[400px] xl:ml-auto m-auto">
      <FilterDropdown
        owner={owner}
        attributes={attributes}
        text={formatFiltersToString(selectedFilters) || "Filters"}
        handleSetSelectedFilters={handleSetSelectedFilters}
        selectedFilters={selectedFilters}
      />
    </div>
  );
}
