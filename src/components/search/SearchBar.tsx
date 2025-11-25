import { useState } from "react";
import { useSearchBarTexts } from "../../i18n/translations/search-files";
import type { Category } from "./CategoryFilter.types";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import { Container } from "./!SearchBar.styled";

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
  const { searchPlaceholder } = useSearchBarTexts();
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
    <Container>
      <SearchInput
        value={inputValue}
        onChange={handleInput}
        onSubmit={handleSubmit}
        placeholder={searchPlaceholder}
      />
      <SearchResults results={filteredResult} category={filterCategory} />
    </Container>
  );
}
