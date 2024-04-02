export default function FilterDropdownOption({
  type,
  attrData,
  attributes,
  selectedFilters,
}) {
  if (!attributes) return null;
  return (
    <>
      {attributes.map((attribute) => (
        <li key={attribute} className="my-1.5">
          <details>
            <summary data-attribute={attribute}>
              <p className="text-neutral-500">{type}</p>
              <p>{attribute}</p>
            </summary>
            <ul>
              {attrData[attribute].map((value) => (
                <li
                  key={value}
                  className={`${selectedFilters[attribute] && selectedFilters[attribute].includes(value) ? "bg-white bg-opacity-10" : ""} my-1.5 rounded-lg`}
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
    </>
  );
}
