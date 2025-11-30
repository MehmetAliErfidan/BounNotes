import { useState } from "react";
import SearchBar from "../components/search/SearchBar";
import CategoryFilter from "../components/search/CategoryFilter";
import type { Category } from "../components/search/CategoryFilter.types";

export default function MarketPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);

  return (
    <div className="p-4">
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <SearchBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}
