import type { Category } from "./CategoryFilter.types";

interface SearchResultsProps {
  results: Array<Record<string, string>>;
  category: Category;
}

export default function SearchResults({
  results,
  category,
}: SearchResultsProps) {
  if (!results.length) {
    return <p className="text-gray-500 mt-2">No results found.</p>;
  }

  return (
    <div className="w-full mt-4 flex flex-col gap-2">
      {results.map((item, index) => {
        switch (category) {
          case "user":
            return (
              <p key={index} className="p-2 border rounded-md bg-gray-50">
                {item.user}
              </p>
            );
          case "course":
            return (
              <p key={index} className="p-2 border rounded-md bg-gray-50">
                {item.course}
              </p>
            );
          case "teacher":
            return (
              <p key={index} className="p-2 border rounded-md bg-gray-50">
                {item.teacher}
              </p>
            );
          default:
            return (
              <p key={index} className="p-2 border rounded-md bg-gray-50">
                {item.user} {item.course} {item.teacher}
              </p>
            );
        }
      })}
    </div>
  );
}
