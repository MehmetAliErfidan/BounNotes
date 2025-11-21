import { useState } from "react";
import { useLoginPageTexts } from "../i18n/translations/pages";
import { useLang } from "../i18n";
import Logo from "../components/common/Logo.tsx";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { lang } = useLang();
  const {
    errorMessage,
    headerText,
    emailPlaceholder,
    passwordPlaceholder,
    login,
    dontHaveAccountText,
    registerLink,
  } = useLoginPageTexts(lang);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (value: string) => {
    const allowedDomain = "std.bogazici.edu.tr";

    if (!value.endsWith(allowedDomain)) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // backend login request is going to be here.
    console.log("Logging in:", email, password);
  };

  return (
    <div className="bg-linear-to-b from-pink-600 to-blue-600 p-4 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="overflow-y-auto scroll-behavior: smooth flex flex-col gap-3 w-full max-w-sm md:max-w-md lg:max-w-lg shadow-[0_0_12px_2px_rgba(96_165_250_0.4)] p-6 rounded-lg bg-blue-200"
      >
        <div className="flex flex-col gap-3 w-full text-center">
          <Logo />
          <p className="text-gray-600 text-base md:text-lg font-semibold">
            {headerText}
          </p>
        </div>
        <label htmlFor="email" className="sr-only">
          {emailPlaceholder}
        </label>
        <input
          placeholder={emailPlaceholder}
          className="border p-2 rounded bg-gray-100"
          id="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <label htmlFor="password" className="sr-only">
          {passwordPlaceholder}
        </label>
        <input
          id="password"
          placeholder={passwordPlaceholder}
          className="border p-2 rounded bg-gray-100"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={!!error || !email || !password}
          className={`${
            !!error || !email || !password
              ? "hover:bg-red-700 bg-red-500 w-full p-2 rounded cursor-not-allowed text-white font-semibold mt-3 transition"
              : "hover:bg-red-700 bg-red-500 w-full p-2 rounded cursor-pointer text-white font-semibold mt-3 transition"
          }`}
        >
          {login}
        </button>
        <p className="text-gray-600 text-sm mt-2">
          {dontHaveAccountText}{" "}
          <Link to="/register">
            <span className="underline text-blue-500 hover:text-blue-700 cursor-pointer">
              {registerLink}
            </span>
          </Link>
        </p>
      </form>
    </div>
  );
}
