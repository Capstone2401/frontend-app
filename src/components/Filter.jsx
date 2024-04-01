import { useEffect, useState } from "react";
import FilterDropdown from "./FilterDropdown";
import InfoService from "../services/info";

export default function Filter({ handleSetFilter, filters }) {
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
    <div className="p-5 w-full">
      <FilterDropdown
        items={attributes}
        text={"Filter"}
        handleSetFilter={handleSetFilter}
        filters={filters}
      />
    </div>
  );
}
