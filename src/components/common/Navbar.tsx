import Logo from "./Logo";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="flex justify-between items-center p-4 bg-linear-to-r from-blue-300 to-pink-400 w-full">
        <div className="ml-16">
          <Logo />
        </div>
        <div className="space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium shadow-sm">
              Giriş Yapın
            </button>
          </Link>

          <Link to="/register">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm cursor-pointer">
              Kayıt Olun
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
