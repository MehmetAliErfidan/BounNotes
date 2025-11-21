import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useNavbarTexts } from "../../i18n/translations/common-files";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { login, register } = useNavbarTexts();

  return (
    <nav className="overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:px-6 lg:px-16 bg-linear-to-r from-blue-300 via-purple-300 to-pink-400 w-full gap-4 sm:gap-0 min-w-full">
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <Logo />
        </div>

        <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
          <Link to="/login">
            <button className="w-full px-3 sm:px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium shadow-sm text-sm sm:text-base">
              {login}
            </button>
          </Link>

          <Link to="/register" className="flex-1 sm:flex-none">
            <button className="w-full px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm cursor-pointer text-sm sm:text-base">
              {register}
            </button>
          </Link>

          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
