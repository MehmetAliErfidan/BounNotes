import { useAppSelector } from "../features/hooks";
import SearchBar from "../components/search/SearchBar";
import CategoryFilter from "../components/search/CategoryFilter";
import NoteCard from "../components/note/NoteCard";
import { SEARCH_RESULTS_TEXTS } from "../i18n/translations/search/SearchResults";
import { useLang } from "../i18n";
import { Main, SearchSection } from "../styles/GlobalStyles";
import Navbar from "../components/common/navbar/Navbar";

import {
  ResultsWrapper,
  SearchInfoText,
  Grid,
  NoResultsWrapper,
} from "./!MarketPage.styled";

export default function MarketPage() {
  const { lang } = useLang();
  const { resultsFound, resultsFor, emptyResults } = SEARCH_RESULTS_TEXTS[lang];

  const { results, query, hasSearched } = useAppSelector(
    (state) => state.search,
  );

  return (
    <>
      <Navbar />
      <Main>
        <SearchSection>
          <SearchBar />
          <CategoryFilter />
        </SearchSection>

        <ResultsWrapper>
          {/* search made, no input */}
          {hasSearched && query.length === 0 && (
            <NoResultsWrapper>{emptyResults}</NoResultsWrapper>
          )}

          {/* search made, no result */}
          {hasSearched && query.length > 0 && results.length === 0 && (
            <NoResultsWrapper>{`${resultsFor} "${query}"`}</NoResultsWrapper>
          )}

          {/* there are results  */}
          {results.length > 0 && (
            <SearchInfoText>
              {`${results.length} ${resultsFound} "${query}"`}
            </SearchInfoText>
          )}

          {/* results */}
          {results.length > 0 && (
            <Grid>
              {results.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </Grid>
          )}
        </ResultsWrapper>
      </Main>
    </>
  );
}
