import { useState } from "react";

interface SearchBarProps {
  selectedCategory: "kullanıcı" | "ders" | "hoca" | null;
}

//bu, backend'le veri çekme özelliği eklenene kadar dummy array, arama yapılınca buradaki öğeler çıkar:
const a = [
  { kullanıcı: "Ali", ders: "Matematik", hoca: "Ahmet" },
  { kullanıcı: "Ayşe", ders: "Fizik", hoca: "Mehmet" },
  { kullanıcı: "Veli", ders: "Kimya", hoca: "Samet" },
];

export default function SearchBar({ selectedCategory }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");
  const [filteredResult, setFilteredResult] = useState<any[]>([]);
  const [filterCategory, setFilterCategory] = useState<
    "kullanıcı" | "ders" | "hoca" | null
  >(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    if (selectedCategory) {
      setFilterCategory(selectedCategory);
      setFilteredResult(
        a.filter((item) =>
          item[selectedCategory]
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        )
      );
    } else {
      setFilteredResult(
        a.filter(
          (x) =>
            x.kullanıcı.toLowerCase().includes(inputValue.toLowerCase()) ||
            x.ders.toLowerCase().includes(inputValue.toLowerCase()) ||
            x.hoca.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  };

  const displayItems = filteredResult.map((item, index) => {
    switch (filterCategory) {
      case "kullanıcı":
        return <p key={index}>{item.kullanıcı}</p>;

      case "ders":
        return <p key={index}>{item.ders}</p>;

      case "hoca":
        return <p key={index}>{item.hoca}</p>;

      default:
        return (
          <p key={index}>
            {item.kullanıcı} {item.ders} {item.hoca}
          </p>
        );
    }
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center gap-0 my-4 mt-4 px-4"
    >
      <input
        onChange={handleInput}
        value={inputValue}
        placeholder="Ara"
        className="border w-xl sm:w-96 md:w-[500px] border-r-0 border-gray-300 rounded-l-full px-4 py-2 shadow-[inset_1px_-2px_3px_rgba(32,33,36,0.1),inset_1px_2px_3px_rgba(32,33,36,0.1)] focus:border-indigo-200 focus:border-2 focus:outline-none"
        type="search"
      />
      <button
        className="font-bold border cursor-pointer bg-gray-100 border-gray-300 rounded-r-full border-l-0 px-4 py-2 hover:bg-neutral-100 shadow-[inset_1px_-2px_3px_rgba(32,33,36,0.1),inset_1px_2px_3px_rgba(32,33,36,0.1)]"
        type="submit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div>{displayItems}</div>
    </form>
  );
}
