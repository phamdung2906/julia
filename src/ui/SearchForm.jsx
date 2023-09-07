/* eslint-disable react/prop-types */
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
function SearchForm({ query, setQuery, placeholder }) {
  return (
    <form className="relative">
      <input
        type="text"
        className="w-[20rem] rounded-md border px-4 py-2 shadow-sm"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2">
        <HiOutlineMagnifyingGlass size={24} />
      </button>
    </form>
  );
}

export default SearchForm;
