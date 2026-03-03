import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "../i18n/translations/pages/Login.ts";
import { useLang } from "../i18n";
import Logo from "../components/common/Logo.tsx";
import { Link } from "react-router-dom";
import * as S from "./!LoginPage.styled";
import { Form, Input, Header, HeaderText } from "../styles/GlobalStyles.ts";
import { useAppDispatch } from "../features/hooks";
import { setUser } from "../features/auth/authSlice";
import { setAccessToken } from "../features/auth/authStorage.ts";
import { loginRequest, parseLoginResponse } from "../features/auth/authApi.ts";

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
    invalidCredentials,
    loginFailed,
    rememberMe,
  } = LOGIN_PAGE[lang];

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMeChecked, setRememberMeChecked] = useState(true);

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validateEmail(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    validateEmail(email);
    try {
      const res = await loginRequest(email, password);

      if (!res.ok) {
        setError(invalidCredentials);
        return;
      }

      const data = await parseLoginResponse(res);
      if (!data.token) {
        setError(loginFailed);
        return;
      }
      setAccessToken(data.token, rememberMeChecked);

      dispatch(
        setUser({
          id: String(data.user.id),
          username: data.user.username,
          avatarUrl: "",
        }),
      );
      navigate("/");
    } catch {
      setError(loginFailed);
    }
  };

  return (
    <S.Container>
      <Form $variant="card" $size="normal" onSubmit={handleSubmit}>
        <Header>
          <Logo />
          <HeaderText>{headerText}</HeaderText>
        </Header>

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
          onChange={handlePasswordChange}
        />

        <S.RememberMeRow htmlFor="remember-me">
          <S.RememberMeCheckbox
            id="remember-me"
            type="checkbox"
            checked={rememberMeChecked}
            onChange={(e) => setRememberMeChecked(e.target.checked)}
          />
          <span>{rememberMe}</span>
        </S.RememberMeRow>

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
