import type { CategoryFilterProps, Category } from "./CategoryFilter.types";
import { RadioButton } from "./RadioButton";
import { useCategoryFilterTexts } from "../../i18n/translations/search-files";

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  const { customize, noteOwner, instructor, course } = useCategoryFilterTexts();
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value as Category);
  };

  return (
    <div className="font-prompt w-full md:w-lg flex justify-center md:justify-start px-4 md:px-0">
      <form className="flex flex-wrap justify-start items-center gap-3 text-sm">
        <p className="font-medium mr-2">{customize}</p>

        <RadioButton
          id="user"
          label={noteOwner}
          value="user"
          checked={selectedCategory === "user"}
          onChange={handleCategoryChange}
        />
        <RadioButton
          id="teacher"
          label={instructor}
          value="teacher"
          checked={selectedCategory === "teacher"}
          onChange={handleCategoryChange}
        />
        <RadioButton
          id="course"
          label={course}
          value="course"
          checked={selectedCategory === "course"}
          onChange={handleCategoryChange}
        />
      </form>
    </div>
  );
}
