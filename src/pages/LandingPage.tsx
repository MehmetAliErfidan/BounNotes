import { Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import SearchBar from "../components/search/SearchBar";
import CategoryFilter from "../components/search/CategoryFilter";
import { LANDING_PAGE_TEXTS } from "../i18n/translations/pages/Landing";
import { useLang } from "../i18n";
import { theme } from "../styles/theme";
import * as S from "./!LandingPage.styled";
import { Main, Heading, SearchSection } from "../styles/GlobalStyles";

export default function LandingPage() {
  const { lang } = useLang();
  const {
    appDefinition,
    noHassleMessage,
    bounNotesDescription,
    emailInfo,
    buttonDirective,
    login,
    register,
    ifNoAccount,
  } = LANDING_PAGE_TEXTS[lang];

  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Navbar />

        <SearchSection>
          <SearchBar />
          <CategoryFilter />
        </SearchSection>

        <Heading>{appDefinition}</Heading>

        <S.ContentWrapper>
          <S.Description>
            {noHassleMessage}
            <S.Spacer />
            {bounNotesDescription}
          </S.Description>
          <S.EmailInfo>{emailInfo}</S.EmailInfo>
        </S.ContentWrapper>

        <S.ButtonSection>
          {buttonDirective}
          <S.Spacer />
          <S.Spacer />
          <Link to="/login">
            <S.LoginButton>{login}</S.LoginButton>
          </Link>
          <S.Spacer />
          <S.Spacer />
          <S.AccountText>{ifNoAccount}</S.AccountText>
          <S.Spacer />
          <Link to="/register">
            <S.RegisterButton>{register}</S.RegisterButton>
          </Link>
        </S.ButtonSection>

        <Footer />
      </Main>
    </ThemeProvider>
  );
}
