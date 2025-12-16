import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { setQuery, setResults } from "../../features/search/searchSlice";
import { useNavigate } from "react-router-dom";
import { SEARCHBAR_TEXTS } from "../../i18n/translations/search/SearchBar";
import { useLang } from "../../i18n";
import SearchInput from "./SearchInput";
import { Container } from "./!SearchBar.styled";
import type { Note } from "../note/NoteTypes"; // yolu ihtiyacına göre

// Dummy data (until backend)
const dummyData = [
  {
    id: 1,
    title: "Math101 Final Notları",
    course: "Math101",
    teacher: "Ahmet",
    username: "Ali",
    rating: 4.8,
    price: "₺50",
    date: "2024",
    description: "math101'dir...",
  },

  {
    id: 2,
    title: "Fizik Final Notları",
    course: "Fizik",
    teacher: "Mehmet",
    username: "Ayşe",
    rating: 4.5,
    price: "₺40",
    date: "2024",
    description: "fizikdir...",
  },
  {
    id: 3,
    title: "Kimya Final Notları",
    course: "Kimya",
    teacher: "Samet",
    username: "Veli",
    rating: 4.7,
    price: "₺45",
    date: "2024",
    description: "kimyadır...",
  },
];

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedCategory = useAppSelector(
    (state) => state.search.selectedCategory
  );

  const { lang } = useLang();
  const { searchPlaceholder } = SEARCHBAR_TEXTS[lang];

  const [inputValue, setInputValue] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    dispatch(setQuery(inputValue));

    const lower = inputValue.toLowerCase();
    let filtered: Note[] = [];

    if (selectedCategory === "user") {
      filtered = dummyData.filter((item) =>
        item.username.toLowerCase().includes(lower)
      );
    } else if (selectedCategory === "course") {
      filtered = dummyData.filter((item) =>
        item.course.toLowerCase().includes(lower)
      );
    } else if (selectedCategory === "teacher") {
      filtered = dummyData.filter((item) =>
        item.teacher.toLowerCase().includes(lower)
      );
    } else {
      filtered = dummyData.filter(
        (item) =>
          item.username.toLowerCase().includes(lower) ||
          item.course.toLowerCase().includes(lower) ||
          item.teacher.toLowerCase().includes(lower)
      );
    }

    dispatch(setResults(filtered));
    navigate("/search");
  };

  return (
    <Container>
      <SearchInput
        value={inputValue}
        onChange={handleInput}
        onSubmit={handleSubmit}
        placeholder={searchPlaceholder}
      />
    </Container>
  );
}
