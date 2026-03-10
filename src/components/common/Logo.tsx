import { Link } from "react-router-dom";
import logoMark from "../../assets/illustrations/logo-bull/logo-mark.png";

export default function Logo() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-0.5 text-5xl leading-none text-blue-800 font-WDXL-Lubrifont-SC"
    >
      <span className="w-16 h-16 shrink-0">
        <img
          src={logoMark}
          alt="BounNotes logo"
          className="w-full h-full object-contain"
        />
      </span>
      <span className="leading-none">BounNotes</span>
    </Link>
  );
}
