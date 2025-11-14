import type { CategoryFilterProps, Category } from "./CategoryFilter.types";
import { RadioButton } from "./RadioButton";

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value as Category);
  };

  return (
    <div className="font-prompt w-full md:w-lg flex justify-center md:justify-start px-4 md:px-0">
      <form className="flex flex-wrap justify-start items-center gap-3 text-sm">
        <p className="font-medium mr-2">Aramanızı Özelleştirin:</p>

        <RadioButton
          id="user"
          label="Kullanıcı (Not Sahibi)"
          value="user"
          checked={selectedCategory === "user"}
          onChange={handleCategoryChange}
        />
        <RadioButton
          id="teacher"
          label="Hoca"
          value="teacher"
          checked={selectedCategory === "teacher"}
          onChange={handleCategoryChange}
        />
        <RadioButton
          id="course"
          label="Ders"
          value="course"
          checked={selectedCategory === "course"}
          onChange={handleCategoryChange}
        />
      </form>
    </div>
  );
}
