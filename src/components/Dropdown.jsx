import { useRef } from "react";

export default function Dropdown({
  defaultText,
  items,
  selection,
  handleSetSelection,
}) {
  if (!items) {
    return null;
  }

  const dropDownRef = useRef(null);

  return (
    <div className="dropdown dropdown-right">
      <div
        tabIndex={0}
        role="button"
        className="btn w-52 text-neutral bg-primary hover:bg-secondary"
      >
        {selection.title || defaultText}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-neutral-600 text-white rounded-md w-52"
        ref={dropDownRef}
      >
        {items.map((item) => (
          <li
            key={item.aggregation || item.title}
            onClick={() => handleSetSelection(item, dropDownRef)}
          >
            <a data-aggregation={item.aggregation}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
