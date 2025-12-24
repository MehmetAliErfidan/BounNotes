import { useAppSelector } from "../features/hooks";
import SearchBar from "../components/search/SearchBar";
import CategoryFilter from "../components/search/CategoryFilter";
import NoteCard from "../components/note/NoteCard";
import { SEARCH_RESULTS_TEXTS } from "../i18n/translations/search/SearchResults";
import { useLang } from "../i18n";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { Main, SearchSection } from "../styles/GlobalStyles";
import Navbar from "../components/common/Navbar";

import { ResultsWrapper, SearchInfoText, Grid } from "./!MarketPage.styled";

export default function MarketPage() {
  const { lang } = useLang();
  const { resultsFound, resultsFor } = SEARCH_RESULTS_TEXTS[lang];

  const { results, query } = useAppSelector((state) => state.search);

  return (
    <ThemeProvider theme={theme}>
      <Main>
        <Navbar />

        <SearchSection>
          <SearchBar />
          <CategoryFilter />
        </SearchSection>

        <ResultsWrapper>
          {/* ---------- search title info ---------- */}
          {query && (
            <SearchInfoText>
              {results.length > 0
                ? `${results.length} ${resultsFound} "${query}"`
                : `${resultsFor} "${query}"`}
            </SearchInfoText>
          )}

          {/* ---------- Results ---------- */}
          {results.length !== 0 && (
            <Grid>
              {results.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </Grid>
          )}
        </ResultsWrapper>
      </Main>
    </ThemeProvider>
  );
}
