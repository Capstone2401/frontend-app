import { useState } from "react";

export default function FilterDropDown({ items, handleSetFilter, filter }) {
  const itemKeys = Object.keys(items);

  const processFilterSelections = (e) => {
    const attr = e.target.getAttribute("data-attribute");
    const value = e.target.getAttribute("data-value");

    if (!attr || !value) return;

    const newFilters = {
      [attr]: value,
    };

    handleSetFilter(newFilters);
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
        {itemKeys.map((attribute) => (
          <li key={attribute} className="my-1.5">
            <details>
              <summary data-attribute={attribute}>{attribute}</summary>
              <ul>
                {items[attribute].map((value) => (
                  <li
                    key={value}
                    className={`${filter[attribute] && filter[attribute].includes(value) ? "bg-neutral-800" : ""} my-1.5 rounded-lg`}
                  >
                    <a data-attribute={attribute} data-value={value}>
                      {value}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
