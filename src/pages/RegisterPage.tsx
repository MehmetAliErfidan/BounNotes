import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { REGISTER } from "../i18n/translations/pages/Register";
import { useLang } from "../i18n";
import Logo from "../components/common/Logo.tsx";
import { Link } from "react-router-dom";
import * as S from "./!RegisterPage.styled";
import { Form, Input, HeaderText, Header } from "../styles/GlobalStyles.ts";
import { ALLOWED_DOMAIN } from "./constants";

export default function RegisterPage() {
  const navigate = useNavigate();

  const { lang } = useLang();

  const {
    unmatchedPasswordsMessage,
    emailErrorMessage,
    passwordErrorMessage,
    codeSentAlert,
    headerText,
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
  } = REGISTER[lang];

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
    if (!value.endsWith(ALLOWED_DOMAIN)) {
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
    navigate("/login");
  };

  const isRegisterDisabled =
    !!emailError ||
    !!passwordError ||
    !password ||
    !!confirmPasswordError ||
    !confirmPassword ||
    !email ||
    !nameSurname ||
    !isEmailVerified;

  return (
    <S.Container>
      <Form variant="card" size="normal" onSubmit={handleSubmit}>
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

        {isFormValid && (
          <S.VerifySection>
            <S.SendCodeButton
              onClick={handleSendCode}
              disabled={isCodeSent}
              $isCodeSent={isCodeSent}
            >
              {isCodeSent ? codeSentText : sendCodeText}
            </S.SendCodeButton>
            <S.VerifyText>{verifyEmailMessage}</S.VerifyText>
          </S.VerifySection>
        )}

        <S.ButtonSection>
          <S.RegisterButton
            disabled={isRegisterDisabled}
            $isDisabled={isRegisterDisabled}
          >
            {registerButtonText}
          </S.RegisterButton>
          <S.FooterText>
            {alreadyHaveAccountText}{" "}
            <Link to="/login">
              <S.LoginLinkSpan>{loginLink}</S.LoginLinkSpan>
            </Link>
          </S.FooterText>
        </S.ButtonSection>
      </Form>
    </S.Container>
  );
}
