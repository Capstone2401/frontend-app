import { useEffect, useState } from "react";
import FilterDropdown from "./FilterDropdown";
import InfoService from "../services/info";

export default function Filter({ handleSetSelectedFilters, selectedFilters }) {
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
    <div className="w-3/4 m-auto">
      <FilterDropdown
        items={attributes}
        text={"Filter"}
        handleSetSelectedFilters={handleSetSelectedFilters}
        selectedFilters={selectedFilters}
      />
    </div>
  );
}
