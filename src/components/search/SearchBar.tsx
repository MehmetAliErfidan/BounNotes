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
import type { NoteWithContext, Note } from "../../config/note.types";
import { dummyData } from "../../data/dummyData";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(searchTriggered());
    dispatch(setQuery(inputValue));

    if (!inputValue.trim()) {
      dispatch(setResults([]));
      navigate("/search");
      return;
    }

    const lower = inputValue.toLowerCase();
    let filtered: Note[] = [];

    const matches = (item: NoteWithContext) => {
      const n = item.note;
      return (
        n.owner.username.toLowerCase().includes(lower) ||
        n.course.toLowerCase().includes(lower) ||
        n.teacher.toLowerCase().includes(lower) ||
        n.title.toLowerCase().includes(lower)
      );
    };

    if (selectedCategory === "user") {
      filtered = dummyData
        .filter((item) =>
          item.note.owner.username.toLowerCase().includes(lower),
        )
        .map((item) => item.note);
    } else if (selectedCategory === "course") {
      filtered = dummyData
        .filter((item) => item.note.course.toLowerCase().includes(lower))
        .map((item) => item.note);
    } else if (selectedCategory === "teacher") {
      filtered = dummyData
        .filter((item) => item.note.teacher.toLowerCase().includes(lower))
        .map((item) => item.note);
    } else {
      filtered = dummyData.filter(matches).map((item) => item.note);
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
