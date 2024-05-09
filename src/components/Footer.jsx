export default function Footer() {
  return (
    <footer>
      <nav>
        <ul className="flex flex-1 gap-3 items-end xl:justify-end xl:flex-row flex-col">
          <li>
            <a
              href="https://data-loaf.com/docs/category/api"
              className="hover:text-white"
            >
              Docs
            </a>
          </li>
          <li>
            <a
              href="https://data-loaf.com/docs/category/case-study"
              className="hover:text-white"
            >
              About
            </a>
          </li>
          <li>
            <a href="https://github.com/data-loaf" className="hover:text-white">
              Github
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
