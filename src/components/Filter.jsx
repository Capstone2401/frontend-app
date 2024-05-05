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

  return (
    <div className="mt-4 xl:w-full w-[400px] m-auto">
      <FilterDropdown
        owner={owner}
        attributes={attributes}
        text={"Filter"}
        handleSetSelectedFilters={handleSetSelectedFilters}
        selectedFilters={selectedFilters}
      />
    </div>
  );
}
