import FilterDropdownOptions from "./FilterDropdownOptions";

export default function FilterDropDown({
  owner,
  attributes,
  handleSetSelectedFilters,
  selectedFilters,
}) {
  const eventAttrState = attributes.event;
  const userAttrState = attributes.user;

  if (!eventAttrState || !userAttrState) return null;

  const processFilterSelections = (e) => {
    const attr = e.target.dataset.attribute;
    const value = e.target.dataset.value;
    const owner = e.currentTarget.dataset.owner;

    if (!attr || !value || !owner) return;

    const newFilters = {
      [attr]: value,
    };

    if (attr in eventAttrState) {
      handleSetSelectedFilters({ events: { ...newFilters }, owner });
    }

    if (attr in userAttrState) {
      handleSetSelectedFilters({ users: { ...newFilters }, owner });
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
        className="menu bg-base-300 border border-neutral-700 w-56 rounded-md text-white dropdown-content z-[1]"
        onClick={processFilterSelections}
        data-owner={owner}
      >
        <div className="max-h-[400px] overflow-auto">
          <FilterDropdownOptions
            type={"events"}
            attrState={eventAttrState}
            selectedFilters={selectedFilters.events}
          />
          <FilterDropdownOptions
            type={"users"}
            attrState={userAttrState}
            selectedFilters={selectedFilters.users}
          />
        </div>
      </ul>
    </div>
  );
}
