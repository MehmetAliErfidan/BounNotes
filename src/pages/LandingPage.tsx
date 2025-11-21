import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import SearchBar from "../components/search/SearchBar";
import type { Category } from "../components/search/CategoryFilter.types";
import CategoryFilter from "../components/search/CategoryFilter";
import { useState } from "react";
import { useLandingPageTexts } from "../i18n/translations/pages";

import { Link } from "react-router-dom";

export default function LandingPage() {
  const {
    appDefinition,
    noHassleMessage,
    bounNotesDescription,
    emailInfo,
    buttonDirective,
    login,
    register,
    ifNoAccount,
  } = useLandingPageTexts();
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);

  return (
    <main className="min-h-screen font-Prompt">
      <Navbar />

      <div className="flex flex-col items-center w-full gap-2 mb-16">
        <SearchBar selectedCategory={selectedCategory} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <h1 className="text-4xl mt-4 text-gray-900 md:text-6xl font-bold text-primary leading-snug">
        {appDefinition}
      </h1>

      <div className="max-w-3xl mx-auto my-6 p-4 text-lg md:text-2xl text-gray-600">
        <p className="mt-8 text-lg md:text-2xl text-gray-800">
          {noHassleMessage}
          <br />
          {bounNotesDescription}
        </p>
        <p className="m-4 p-4 md:p-8 text-lg md:text-2xl text-gray-800">
          {emailInfo}
        </p>
      </div>

      <div className="mx-4 mt-4 mb-6 p-4 text-lg md:text-2xl font-bold">
        {buttonDirective}
        <br />
        <br />
        <Link to="/login">
          <button className="bg-red-500 hover:bg-red-700 text-gray-800 px-6 py-3 rounded-lg shadow transition">
            {login}
          </button>
        </Link>
        <br />
        <br />
        <p>{ifNoAccount}</p>
        <br />
        <Link to="/register">
          <button className="bg-blue-500 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
            {register}
          </button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
