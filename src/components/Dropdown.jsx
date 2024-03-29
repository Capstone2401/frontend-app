export default function Dropdown({
  defaultDisplay,
  items,
  selection,
  handleSetSelection,
}) {
  if (!items) {
    return null;
  }

  return (
    <div className="dropdown dropdown-right w-full">
      <div
        tabIndex={0}
        className="w-full px-4 py-2 text-primary bg-primary bg-opacity-10 hover:bg-primary hover:bg-opacity-40 hover:cursor-pointer active:scale-98 transition transition-duration-300 rounded-md"
      >
        {selection.display || defaultDisplay}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu mx-2 p-2 shadow bg-base-200 border border-neutral-600 text-white rounded-md w-52"
        onClick={(e) => handleSetSelection(e)}
      >
        {items.map((item) => (
          <li key={item.display}>
            <a
              {...Object.keys(item).reduce((acc, key) => {
                acc[`data-${key}`] = item[key];
                return acc;
              }, {})}
            >
              {item.display}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
