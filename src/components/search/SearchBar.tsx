import { useState } from "react";
import type { Category } from "./CategoryFilter.types";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

interface SearchBarProps {
  selectedCategory: Category;
}

// Dummy data (until backend)
const dummyData = [
  { user: "Ali", course: "Matematik", teacher: "Ahmet" },
  { user: "Ayşe", course: "Fizik", teacher: "Mehmet" },
  { user: "Veli", course: "Kimya", teacher: "Samet" },
];

export default function SearchBar({ selectedCategory }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [filteredResult, setFilteredResult] = useState<typeof dummyData>([]);
  const [filterCategory, setFilterCategory] = useState<Category>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    if (selectedCategory) {
      setFilterCategory(selectedCategory);
      setFilteredResult(
        dummyData.filter((item) =>
          item[selectedCategory]
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        )
      );
    } else {
      setFilteredResult(
        dummyData.filter(
          (x) =>
            x.user.toLowerCase().includes(inputValue.toLowerCase()) ||
            x.course.toLowerCase().includes(inputValue.toLowerCase()) ||
            x.teacher.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setFilterCategory(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 my-4 mt-4 px-4 w-full max-w-2xl mx-auto">
      <SearchInput
        value={inputValue}
        onChange={handleInput}
        onSubmit={handleSubmit}
        placeholder="Ara"
      />
      <SearchResults results={filteredResult} category={filterCategory} />
    </div>
  );
}
