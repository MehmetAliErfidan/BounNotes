import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "../../components/note/NoteTypes";
import type { Category } from "../../components/search/CategoryFilter.types";

interface SearchState {
  query: string;
  selectedCategory: Category | null;
  results: Note[];
  status: "idle" | "loading" | "success" | "error";
}

const initialState: SearchState = {
  query: "",
  selectedCategory: null,
  results: [],
  status: "idle",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<Category | null>) {
      state.selectedCategory = action.payload;
    },
    setResults(state, action: PayloadAction<Note[]>) {
      state.results = action.payload;
    },
  },
});

export const { setQuery, setSelectedCategory, setResults } =
  searchSlice.actions;

export default searchSlice.reducer;
