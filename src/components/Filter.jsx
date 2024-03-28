import { useEffect, useState } from "react";
import FilterDropdown from "./FilterDropdown";
import axios from "axios";

export default function Filter({ handleSetFilter, filter }) {
  const [attributes, setAttributes] = useState({});

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.get("/api/attributes");
        setAttributes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAttributes();
  }, []);
  // const mockData = {
  //   device: ["desktop", "iPhone", "Mac"],
  //   city: ["Boston", "New york"],
  // };

  return (
    <div className="p-5 w-full">
      <FilterDropdown
        items={attributes}
        text={"Filter"}
        handleSetFilter={handleSetFilter}
        filter={filter}
      />
    </div>
  );
}
