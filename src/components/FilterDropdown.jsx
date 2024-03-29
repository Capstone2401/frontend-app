import FilterDropdownOptions from "./FilterDropdownOptions";

export default function FilterDropDown({ items, handleSetFilter, filter }) {
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
      <label tabIndex={0} className="btn m-1 w-52 bg-neutral-600">
        Filter
      </label>
      <ul
        tabIndex={0}
        className="menu bg-base-200 w-56 rounded-md text-white dropdown-content z-[1]"
        onClick={processFilterSelections}
      >
        <FilterDropdownOptions
          type={"events"}
          attrData={eventAttrData}
          attributes={Object.keys(eventAttrData)}
          handleSetFilter={handleSetFilter}
          filter={filter.events}
        />
        <FilterDropdownOptions
          type={"users"}
          attrData={userAttrData}
          attributes={Object.keys(userAttrData)}
          handleSetFilter={handleSetFilter}
          filter={filter.users}
        />
      </ul>
    </div>
  );
}
