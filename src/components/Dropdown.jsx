export default function Dropdown({ text, items, handleSetSelection }) {
  if (!items) {
    return null;
  }

  return (
    <div className="dropdown dropdown-right">
      <div
        tabIndex={0}
        role="button"
        className="btn w-52 text-base-100 bg-primary hover:bg-secondary"
      >
        {text}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-neutral-600 text-white rounded-md w-52"
        onClick={(e) => handleSetSelection(e)}
      >
        {items.map((item) => (
          <li key={item}>
            <a>{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
