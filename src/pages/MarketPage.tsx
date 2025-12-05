import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/search/SearchBar";
import CategoryFilter from "../components/search/CategoryFilter";
import type { Category } from "../components/search/CategoryFilter.types";

export default function MarketPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const query = params.get("query") || "";
  const category = (params.get("category") as Category) || null;
  const [selectedCategory, setSelectedCategory] = useState<Category>(category);

  return (
    <div className="p-4">
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <SearchBar selectedCategory={selectedCategory} />
    </div>
  );
}
