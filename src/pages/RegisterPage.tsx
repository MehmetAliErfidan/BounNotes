import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTER } from "../i18n/translations/pages/Register";
import { useLang } from "../i18n";
import Logo from "../components/common/Logo.tsx";
import { Link } from "react-router-dom";
import * as S from "./!RegisterPage.styled";
import { Form, Input, HeaderText, Header } from "../styles/GlobalStyles.ts";
import { ALLOWED_DOMAIN } from "./constants";
import { API_BASE_URL, ALLOW_NON_BOUN_DEV_EMAILS } from "../config/api.ts";
export default function RegisterPage() {
  const navigate = useNavigate();

  const { lang } = useLang();

  const {
    unmatchedPasswordsMessage,
    emailErrorMessage,
    passwordErrorMessage,
    headerText,
    namePlaceholder,
    surnamePlaceholder,
    emailPlaceholder,
    passwordPlaceholder,
    confirmPasswordPlaceholder,
    registerButtonText,
    alreadyHaveAccountText,
    loginLink,
    verifyEmailMessage,
    registerFailedMessage,
    registerSuccessFallback,
    emailAlreadyInUseMessage,
    registeringButtonText,
  } = REGISTER[lang];

  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

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
    if (ALLOW_NON_BOUN_DEV_EMAILS) {
      setEmailError("");
      return;
    }

    if (!value.endsWith(ALLOWED_DOMAIN)) {
      setEmailError(emailErrorMessage);
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password: string) => {
    const requiredPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&.,;:_])[A-Za-z\d$!%*?&.,;:_]{8,}$/;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setSubmitError("");
      setSubmitSuccess("");

      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          surname,
          password,
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        message?: string;
        error?: string;
      } | null;

      if (!res.ok) {
        const rawError = data?.message || data?.error || "";
        if (rawError === "Email already in use") {
          setSubmitError(emailAlreadyInUseMessage);
          return;
        }
        setSubmitError(rawError || registerFailedMessage);
        return;
      }
      setSubmitSuccess(
        data?.message || registerSuccessFallback,
      );
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch {
      setSubmitError(registerFailedMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isRegisterDisabled =
    !!emailError ||
    !!passwordError ||
    !password ||
    !!confirmPasswordError ||
    !confirmPassword ||
    !email ||
    !nameSurname ||
    isSubmitting;

  return (
    <S.Container>
      <Form $variant="card" $size="normal" onSubmit={handleSubmit}>
        <Header>
          <Logo />
          <HeaderText>{headerText}</HeaderText>
        </Header>

        <S.InputContainer>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder={namePlaceholder}
            required
            minLength={2}
          />
          <Input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            type="text"
            placeholder={surnamePlaceholder}
            required
            minLength={2}
          />
          <Input
            value={email}
            onChange={handleChange}
            type="email"
            placeholder={emailPlaceholder}
          />
          {emailError && <S.ErrorText>{emailError}</S.ErrorText>}

          <Input
            value={password}
            onChange={handlePassword}
            type="password"
            placeholder={passwordPlaceholder}
          />
          {passwordError && <S.ErrorText>{passwordError}</S.ErrorText>}

          <Input
            type="password"
            placeholder={confirmPasswordPlaceholder}
            value={confirmPassword}
            onChange={(e) => validateConfirmPassword(e.target.value)}
          />

          {confirmPasswordError && (
            <S.ErrorText>{confirmPasswordError}</S.ErrorText>
          )}
        </S.InputContainer>

        <S.VerifySection>
          <S.VerifyText>{verifyEmailMessage}</S.VerifyText>
        </S.VerifySection>

        <S.ButtonSection>
          <S.RegisterButton
            disabled={isRegisterDisabled}
            $isDisabled={isRegisterDisabled}
          >
            {isSubmitting ? registeringButtonText : registerButtonText}
          </S.RegisterButton>
          <S.FooterText>
            {alreadyHaveAccountText}{" "}
            <Link to="/login">
              <S.LoginLinkSpan>{loginLink}</S.LoginLinkSpan>
            </Link>
          </S.FooterText>
          {submitError && <S.SubmitErrorText>{submitError}</S.SubmitErrorText>}
          {submitSuccess && (
            <S.SubmitSuccessText>{submitSuccess}</S.SubmitSuccessText>
          )}
        </S.ButtonSection>
      </Form>
    </S.Container>
  );
}
