import logoText from "../assets/logo-text.png";
import logoImage from "../assets/logo-image.png";

export default function Header() {
  return (
    <div>
      <header className="border-b border-b-neutral-600 pb-6 flex justify-between">
        <div className="flex">
          <img src={logoImage} className="h-12 self-center blur-xs" />
          <img src={logoText} className="h-6 self-center blur-xs" />
        </div>
        <p className="text-right self-end">Powered by AWS</p>
      </header>
    </div>
  );
}
