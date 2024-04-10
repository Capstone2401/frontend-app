export default function Header() {
  return (
    <div>
      <header className="border-b border-b-neutral-600 pb-6 flex justify-between">
        <div className="flex">
          <img
            src="./src/assets/logo-image.png"
            className="h-12 self-center blur-xs"
          />
          <img
            src="./src/assets/logo-text.png"
            className="h-6 self-center blur-xs"
          />
        </div>
        <p className="text-right self-end">Powered by AWS</p>
      </header>
    </div>
  );
}
