import { useRef } from "react";

export default function Dropdown({
  defaultTitle,
  items,
  selection,
  handleSetSelection,
}) {
  const dropDownRef = useRef(null);
  if (!items) {
    return null;
  }

  return (
    <div className="dropdown dropdown-right">
      <div
        tabIndex={0}
        role="button"
        className="btn w-52 text-neutral bg-primary hover:bg-secondary rounded-md"
      >
        {selection.title || defaultTitle}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu mx-2 p-2 shadow bg-base-200 text-white rounded-md w-52"
        ref={dropDownRef}
      >
        {items.map((item) => (
          <li
            key={item.title}
            onClick={() => handleSetSelection(item, dropDownRef)}
          >
            <a data-aggregation={item.aggregation}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
