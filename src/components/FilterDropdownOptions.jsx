export default function FilterDropdownOption({
  type,
  attrState,
  selectedFilters,
}) {
  if (!attrState) return null;

  const attributeNames = Object.keys(attrState);

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
                {attrState[attribute].map((attrValue) => {
                  return (
                    <li
                      key={attrValue}
                      className={`${selectedFilters && selectedFilters[attribute] && selectedFilters[attribute].includes(attrValue) ? "bg-white bg-opacity-10" : ""} my-1.5 rounded-lg`}
                    >
                      <a data-attribute={attribute} data-value={attrValue}>
                        {attrValue}
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
