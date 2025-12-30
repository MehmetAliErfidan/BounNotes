import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "../../components/note/NoteTypes";
import type { Category } from "../../components/search/CategoryFilter.types";

interface SearchState {
  query: string;
  selectedCategory: Category | null;
  results: Note[];
  status: "idle" | "loading" | "success" | "error";
  hasSearched: boolean;
}

const initialState: SearchState = {
  query: "",
  selectedCategory: null,
  results: [],
  status: "idle",
  hasSearched: false,
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

    searchTriggered(state) {
      state.hasSearched = true;
    },
  },
});

export const { setQuery, setSelectedCategory, setResults, searchTriggered } =
  searchSlice.actions;

export default searchSlice.reducer;
