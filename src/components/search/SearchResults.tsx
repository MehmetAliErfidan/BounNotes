import type { Category } from "./CategoryFilter.types";
import { SEARCH_RESULTS_TEXTS } from "../../i18n/translations/search/SearchResults";
import { useLang } from "../../i18n";
import { useNavigate } from "react-router-dom";

interface SearchResultsProps {
  results: Array<Record<string, string>>;
  category: Category;
  inputValue: string;
}

export default function SearchResults({
  results,
  category,
  inputValue,
}: SearchResultsProps) {
  const navigate = useNavigate();
  const { lang } = useLang();
  const { noResult } = SEARCH_RESULTS_TEXTS[lang];
  if (!results.length) {
    return <p className="text-gray-500 mt-2">{noResult}</p>;
  }

  const goToSearchResult = () => {
    const url = new URL("/notes/search", window.location.origin);
    const params = new URLSearchParams({
      query: inputValue,
      ...(category && { category: category as string }),
    });
    url.search = params.toString();
    const path = url.pathname + url.search;
    console.log(path);
    navigate(path);
  };

  return (
    <div className="w-full mt-4 flex flex-col gap-2">
      {results.map((item, index) => {
        switch (category) {
          case "user":
            return (
              <p
                key={index}
                onClick={goToSearchResult}
                className="p-2 border rounded-md bg-gray-50"
              >
                {item.user}
              </p>
            );
          case "course":
            return (
              <p
                key={index}
                className="p-2 border rounded-md bg-gray-50"
                onClick={goToSearchResult}
              >
                {item.course}
              </p>
            );
          case "teacher":
            return (
              <p
                key={index}
                className="p-2 border rounded-md bg-gray-50"
                onClick={goToSearchResult}
              >
                {item.teacher}
              </p>
            );
          default:
            return (
              <p
                key={index}
                className="p-2 border rounded-md bg-gray-50"
                onClick={goToSearchResult}
              >
                {item.user} {item.course} {item.teacher}
              </p>
            );
        }
      })}
    </div>
  );
}
