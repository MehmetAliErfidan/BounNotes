interface CategoryFilterProps {
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<"kullanıcı" | "ders" | "hoca" | null>
  >;
  selectedCategory: "kullanıcı" | "ders" | "hoca" | null;
}

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  const isCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value as "kullanıcı" | "ders" | "hoca");
  };

  // şu anda bu kod kategoriyi seçmeyi belirliyor ama arama kısmına geçmedik, chatGPT'nin yönlendirmesine bak.
  return (
    <div className="font-prompt w-full md:w-lg flex justify-center md:justify-start px-4 md:px-0">
      <form className="flex flex-wrap justify-start items-center gap-3 text-sm">
        <p className="font-medium mr-2">Aramanızı Özelleştirin:</p>

        <label
          className="space-x-2 cursor-pointer flex items-center"
          htmlFor="not-sahibi"
        >
          <input
            onChange={isCategory}
            id="not-sahibi"
            name="kategori"
            className="mr-2 mb-1"
            type="radio"
            value="kullanıcı"
            checked={selectedCategory === "kullanıcı"}
          />
          Kullanıcı (Not Sahibi)
        </label>

        <label
          className="space-x-2 cursor-pointer flex items-center"
          htmlFor="hoca"
        >
          <input
            onChange={isCategory}
            id="hoca"
            value="hoca"
            name="kategori"
            className="mr-2 mb-1"
            type="radio"
            checked={selectedCategory === "hoca"}
          />
          Hoca
        </label>

        <label
          className="space-x-2 cursor-pointer flex items-center"
          htmlFor="ders"
        >
          <input
            onChange={isCategory}
            id="ders"
            value="ders"
            name="kategori"
            className="mr-2 mb-1"
            type="radio"
            checked={selectedCategory === "ders"}
          />
          Ders
        </label>
      </form>
    </div>
  );
}
