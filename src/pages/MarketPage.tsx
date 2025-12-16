import { useAppSelector } from "../features/hooks";
import SearchBar from "../components/search/SearchBar";
import CategoryFilter from "../components/search/CategoryFilter";
import NoteCard from "../components/note/NoteCard";
import { SEARCH_RESULTS_TEXTS } from "../i18n/translations/search/SearchResults";
import { useLang } from "../i18n";

export default function MarketPage() {
  const { lang } = useLang();
  const { noResult, resultsFound, resultsFor } = SEARCH_RESULTS_TEXTS[lang];

  const { results, query } = useAppSelector((state) => state.search);

  return (
    <div className="p-4 font-prompt">
      <SearchBar />
      <CategoryFilter />

      <div className="mt-6">
        {/* ---------- search title info ---------- */}
        {query && (
          <p className="text-sm text-gray-600 mb-3">
            {results.length > 0
              ? `${results.length} ${resultsFound} "${query}"`
              : `${resultsFor} "${query}"`}
          </p>
        )}

        {/* ---------- Results ---------- */}
        {results.length === 0 ? (
          <p className="text-gray-500">{noResult}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
