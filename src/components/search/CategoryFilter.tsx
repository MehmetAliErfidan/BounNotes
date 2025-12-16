import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { setSelectedCategory } from "../../features/search/searchSlice";
import type { Category } from "./CategoryFilter.types";
import { RadioButton } from "./RadioButton";
import { CATEGORY_FILTER_TEXTS } from "../../i18n/translations/search/CategoryFilter";
import { useLang } from "../../i18n";

export default function CategoryFilter() {
  const dispatch = useAppDispatch();

  const selectedCategory = useAppSelector(
    (state) => state.search.selectedCategory
  );

  const { lang } = useLang();
  const { customize, noteOwner, instructor, course } =
    CATEGORY_FILTER_TEXTS[lang];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedCategory(e.target.value as Category));
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
