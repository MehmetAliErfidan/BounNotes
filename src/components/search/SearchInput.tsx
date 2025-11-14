import SearchIcon from "./SearchIcon";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
}

export default function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Ara",
}: SearchInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-xl items-stretch">
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 min-w-0 border border-r-0 border-gray-300 rounded-l-full px-4 py-2 text-sm sm:text-base shadow-[inset_1px_-2px_3px_rgba(32,33,36,0.1),inset_1px_2px_3px_rgba(32,33,36,0.1)] focus:border-indigo-200 focus:border-2 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 font-bold border cursor-pointer bg-gray-100 border-gray-300 rounded-r-full border-l-0 px-3 sm:px-4 py-2 hover:bg-neutral-100 shadow-[inset_1px_-2px_3px_rgba(32,33,36,0.1),inset_1px_2px_3px_rgba(32,33,36,0.1)]"
      >
        <SearchIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </form>
  );
}
