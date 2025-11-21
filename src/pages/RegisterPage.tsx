import React, { useState, useEffect } from "react";
import { useRegisterPageTexts } from "../i18n/translations/pages";
import Logo from "../components/common/Logo.tsx";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const {
    unmatchedPasswordsMessage,
    emailErrorMessage,
    passwordErrorMessage,
    codeSentAlert,
    registerHeaderText,
    namePlaceholder,
    surnamePlaceholder,
    emailPlaceholder,
    passwordPlaceholder,
    confirmPasswordPlaceholder,
    registerButtonText,
    alreadyHaveAccountText,
    loginLink,
    codeSentText,
    sendCodeText,
    verifyEmailMessage,
  } = useRegisterPageTexts();

  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    if (confirmPassword) {
      if (confirmPassword != password) {
        setConfirmPasswordError(unmatchedPasswordsMessage);
      } else {
        setConfirmPasswordError("");
      }
    }
  }, [password, confirmPassword]);

  const nameSurname = name.length >= 2 && surname.length >= 2;

  const validateEmail = (value: string) => {
    const allowedDomain = "@std.bogazici.edu.tr";

    if (!value.endsWith(allowedDomain)) {
      setEmailError(emailErrorMessage);
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password: string) => {
    const requiredPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;:])[A-Za-z\d@$!%*?&.,;:]{8,}$/;

    if (!requiredPassword.test(password) || password.length == 0) {
      setPasswordError(passwordErrorMessage);
    } else {
      setPasswordError("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const validateConfirmPassword = (value: string) => {
    setConfirmPassword(value);

    if (password != value) {
      setConfirmPasswordError(unmatchedPasswordsMessage);
    } else {
      setConfirmPasswordError("");
    }
  };

  const isFormValid =
    !emailError &&
    !passwordError &&
    password &&
    !confirmPasswordError &&
    confirmPassword &&
    email &&
    nameSurname;

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsCodeSent(true);
    setTimeout(() => {
      alert(codeSentAlert);

      setIsEmailVerified(true); // Email will be accepted as validated until backend
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // backend login request is going to be here.
    console.log("Registering", name, surname, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-pink-400 to-blue-300 p-4">
      <form
        onSubmit={handleSubmit}
        className="overflow-y-auto scroll-behavior: smooth flex flex-col gap-3 w-full max-w-sm md:max-w-md lg:max-w-lg shadow-[0_0_12px_2px_rgba(96_165_250_0.4)] p-6 rounded-lg bg-blue-200"
      >
        <div className="flex flex-col gap-3 w-full text-center">
          <Logo />
          <p className="text-gray-600 text-base md:text-lg font-semibold">
            {registerHeaderText}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder={namePlaceholder}
            className="border p-2 rounded bg-gray-50"
            required
            minLength={2}
          />
          <input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            type="text"
            placeholder={surnamePlaceholder}
            className="border p-2 rounded bg-gray-50"
            required
            minLength={2}
          />
          <input
            value={email}
            onChange={handleChange}
            type="email"
            placeholder={emailPlaceholder}
            className="border p-2 rounded bg-gray-50"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <input
            value={password}
            onChange={handlePassword}
            type="password"
            placeholder={passwordPlaceholder}
            className="border p-2 rounded bg-gray-50"
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          <input
            type="password"
            placeholder={confirmPasswordPlaceholder}
            value={confirmPassword}
            onChange={(e) => validateConfirmPassword(e.target.value)}
            className="border p-2 rounded bg-gray-50"
          />

          {confirmPasswordError && (
            <p className="text-red-500 text-sm">{confirmPasswordError}</p>
          )}
        </div>

        {isFormValid && (
          <div className="text-center">
            <button
              onClick={handleSendCode}
              disabled={isCodeSent}
              className={`mt-2 w-full p-2 rounded font-semibold  transition ${
                isCodeSent
                  ? "bg-gray-400 cursor-not-allowed"
                  : " bg-amber-300 hover:bg-amber-400 cursor-pointer"
              }
              `}
            >
              {isCodeSent ? codeSentText : sendCodeText}
            </button>
            <p className="text-gray-600 text-sm mt-1">{verifyEmailMessage}</p>
          </div>
        )}

        <div className="text-center">
          <button
            disabled={
              !!emailError ||
              !!passwordError ||
              !password ||
              !!confirmPasswordError ||
              !confirmPassword ||
              !email ||
              !nameSurname ||
              !isEmailVerified
            }
            className={`${
              !!emailError ||
              !!passwordError ||
              !password ||
              !!confirmPasswordError ||
              !confirmPassword ||
              !email ||
              !nameSurname ||
              !isEmailVerified
                ? "bg-gray-400 cursor-not-allowed w-full p-2 rounded text-white font-semibold mt-3 transition"
                : "bg-blue-500 hover:bg-blue-700 cursor-pointer w-full p-2 rounded text-white font-semibold mt-3 transition"
            }`}
          >
            {registerButtonText}
          </button>
          <p className="text-gray-600 text-sm mt-2">
            {alreadyHaveAccountText}{" "}
            <Link to="/login">
              <span className="underline text-red-500 hover:text-red-700 cursor-pointer">
                {loginLink}
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
