import FilterDropdownOptions from "./FilterDropdownOptions";

export default function FilterDropDown({ items, handleSetFilter, filters }) {
  const eventAttrData = items.event;
  const userAttrData = items.user;

  if (!eventAttrData || !userAttrData) return null;

  const processFilterSelections = (e) => {
    const attr = e.target.getAttribute("data-attribute");
    const value = e.target.getAttribute("data-value");

    if (!attr || !value) return;

    const newFilters = {
      [attr]: value,
    };

    if (attr in eventAttrData) {
      handleSetFilter({ events: { ...newFilters } });
    }

    if (attr in userAttrData) {
      handleSetFilter({ users: { ...newFilters } });
    }
  };

  return (
    <div className="dropdown dropdown-right">
      <label
        tabIndex={0}
        className="btn bg-base-300 hover:bg-white hover:bg-opacity-5  p-3 mx-1 w-36"
      >
        Filter
      </label>
      <ul
        tabIndex={0}
        className="menu bg-base-200 border border-neutral-700 w-56 rounded-md text-white dropdown-content z-[1]"
        onClick={processFilterSelections}
      >
        <FilterDropdownOptions
          type={"events"}
          attrData={eventAttrData}
          attributes={Object.keys(eventAttrData)}
          handleSetFilter={handleSetFilter}
          filter={filters.events}
        />
        <FilterDropdownOptions
          type={"users"}
          attrData={userAttrData}
          attributes={Object.keys(userAttrData)}
          handleSetFilter={handleSetFilter}
          filter={filters.users}
        />
      </ul>
    </div>
  );
}
