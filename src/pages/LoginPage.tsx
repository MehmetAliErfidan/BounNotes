import { useState } from "react";
import { LOGIN_PAGE } from "../i18n/translations/pages/Login.ts";
import { useLang } from "../i18n";
import Logo from "../components/common/Logo.tsx";
import { Link } from "react-router-dom";
import * as S from "./!LoginPage.styled";

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
  } = LOGIN_PAGE[lang];

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
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <S.Header>
          <Logo />
          <S.HeaderText>{headerText}</S.HeaderText>
        </S.Header>

        <S.Label htmlFor="email">{emailPlaceholder}</S.Label>
        <S.Input
          placeholder={emailPlaceholder}
          id="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        {error && <S.ErrorText>{error}</S.ErrorText>}

        <S.Label htmlFor="password">{passwordPlaceholder}</S.Label>
        <S.Input
          id="password"
          placeholder={passwordPlaceholder}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <S.SubmitButton
          disabled={!!error || !email || !password}
          $hasError={!!error}
          $hasEmail={!!email}
          $hasPassword={!!password}
        >
          {login}
        </S.SubmitButton>

        <S.FooterText>
          {dontHaveAccountText}{" "}
          <Link to="/register">
            <S.RegisterLinkSpan>{registerLink}</S.RegisterLinkSpan>
          </Link>
        </S.FooterText>
      </S.Form>
    </S.Container>
  );
}
