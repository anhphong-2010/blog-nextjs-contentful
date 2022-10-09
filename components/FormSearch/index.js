import React from "react";
import { useRouter } from "next/router";
import { Config } from "@utils/config";

export default function FormSearch() {
  const [searchTerm, $searchTerm] = React.useState({ value: "" });
  const router = useRouter();

  const handleChange = (event) => {
    $searchTerm({ value: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(
      `${Config.pageMeta.search.slug}?result=${_.get(searchTerm, "value", "")}`
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onChange={handleChange} onKeyDown={handleKeyDown}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          name="search"
          id="default-search"
          className="block p-4 pl-10 w-full lg:w-2/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white"
          placeholder="Search articles..."
        />
      </div>
    </form>
  );
}
