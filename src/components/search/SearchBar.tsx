import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  setQuery,
  setResults,
  searchTriggered,
} from "../../features/search/searchSlice";
import { useNavigate } from "react-router-dom";
import { SEARCHBAR_TEXTS } from "../../i18n/translations/search/SearchBar";
import { useLang } from "../../i18n";
import SearchInput from "./SearchInput";
import { Container } from "./!SearchBar.styled";
import type { Note } from "../../config/note.types";
import { API_BASE_URL } from "../../config/api";

/* // Dummy data (until backend)
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
]; */

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedCategory = useAppSelector(
    (state) => state.search.selectedCategory,
  );

  const { lang } = useLang();
  const { searchPlaceholder } = SEARCHBAR_TEXTS[lang];

  const query = useAppSelector((state) => state.search.query);
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchTriggered());
    dispatch(setQuery(inputValue));

    if (!inputValue.trim()) {
      dispatch(setResults([]));
      navigate("/search");
      return;
    }

    const lower = inputValue.toLowerCase();
    try {
      const response = await fetch(`${API_BASE_URL}/api/notes`);
      if (!response.ok) {
        dispatch(setResults([]));
        navigate("/search");
        return;
      }

      const notes = (await response.json()) as Note[];
      let filtered: Note[] = [];
      const matches = (n: Note) => {
        return (
          n.owner.username.toLowerCase().includes(lower) ||
          n.course.toLowerCase().includes(lower) ||
          n.teacher.toLowerCase().includes(lower) ||
          n.title.toLowerCase().includes(lower)
        );
      };

      if (selectedCategory === "user") {
        filtered = notes.filter((note) =>
          note.owner.username.toLowerCase().includes(lower),
        );
      } else if (selectedCategory === "course") {
        filtered = notes.filter((note) => note.course.toLowerCase().includes(lower));
      } else if (selectedCategory === "teacher") {
        filtered = notes.filter((note) =>
          note.teacher.toLowerCase().includes(lower),
        );
      } else {
        filtered = notes.filter(matches);
      }

      dispatch(setResults(filtered));
      navigate("/search");
    } catch {
      dispatch(setResults([]));
      navigate("/search");
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
    </Container>
  );
}
