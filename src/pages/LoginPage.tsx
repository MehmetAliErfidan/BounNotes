import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "../i18n/translations/pages/Login.ts";
import { useLang } from "../i18n";
import Logo from "../components/common/Logo.tsx";
import { Link } from "react-router-dom";
import * as S from "./!LoginPage.styled";
import { Form, Input } from "../styles/GlobalStyles.ts";
import { useAppDispatch } from "../features/hooks";
import { setUser } from "../features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

    // for now mock login, until backend login request is going to be here.
    dispatch(
      setUser({
        username: email.split("@")[0],
        avatarUrl: "",
      }),
    );

    navigate("/");
  };

  return (
    <S.Container>
      <Form variant="card" size="normal" onSubmit={handleSubmit}>
        <S.Header>
          <Logo />
          <S.HeaderText>{headerText}</S.HeaderText>
        </S.Header>

        <S.Label htmlFor="email">{emailPlaceholder}</S.Label>
        <Input
          placeholder={emailPlaceholder}
          id="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        {error && <S.ErrorText>{error}</S.ErrorText>}

        <S.Label htmlFor="password">{passwordPlaceholder}</S.Label>
        <Input
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
      </Form>
    </S.Container>
  );
}
