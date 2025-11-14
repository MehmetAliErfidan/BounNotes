export type Category = "user" | "course" | "teacher" | null;

export interface CategoryFilterProps {
  selectedCategory: Category;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
}
