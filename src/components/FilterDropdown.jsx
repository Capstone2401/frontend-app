import FilterDropdownOptions from "./FilterDropdownOptions";

export default function FilterDropDown({
  owner,
  attributes,
  handleSetSelectedFilters,
  selectedFilters,
  text,
}) {
  const eventAttrState = attributes.event;
  const userAttrState = attributes.user;

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
    <button className="dropdown dropdown-right w-full">
      <label
        tabIndex={0}
        className="inline-block text-start btn btn-sm border bg-base-100 border-neutral-700 hover:bg-white hover:bg-opacity-5 h-fit w-full"
      >
        <p className="truncate py-3 px-2 self-start text-neutral-300">{text}</p>
      </label>
      <ul
        tabIndex={0}
        className="menu bg-base-300 border border-neutral-700 w-56 rounded-md text-white dropdown-content z-[1]"
        onClick={processFilterSelections}
        data-owner={owner}
      >
        <div className="max-h-[300px] overflow-auto">
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
    </button>
  );
}
