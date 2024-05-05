export default function FilterDropdownOption({
  type,
  attrState,
  selectedFilters,
}) {
  const attributeNames = Object.keys(attrState);

  if (!attributeNames || !attrState) return null;
  return (
    <>
      {attributeNames.map((attribute) => {
        return (
          <li key={attribute} className="my-1.5">
            <details>
              <summary data-attribute={attribute}>
                <p className="text-neutral-500">{type}</p>
                <p>{attribute}</p>
              </summary>
              <ul>
                {attrState[attribute].map((value) => {
                  return (
                    <li
                      key={value}
                      className={`${selectedFilters && selectedFilters[attribute] && selectedFilters[attribute].includes(value) ? "bg-white bg-opacity-10" : ""} my-1.5 rounded-lg`}
                    >
                      <a data-attribute={attribute} data-value={value}>
                        {value}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>
        );
      })}
    </>
  );
}
