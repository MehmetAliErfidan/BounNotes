import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import SearchBar from "../components/search/SearchBar";
import CategoryFilter from "../components/search/CategoryFilter";
import { useState } from "react";

import { Link } from "react-router-dom";

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "kullanıcı" | "ders" | "hoca" | null
  >(null);

  return (
    <main className="min-h-screen font-Prompt flex flex-col items-center">
      <Navbar />

      <div className="flex flex-col items-center w-full gap-2 mb-16">
        <SearchBar selectedCategory={selectedCategory} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <h1 className="text-4xl mt-4 text-gray-900 md:text-6xl font-bold text-primary leading-snug text-center px-4 max-w-5xl">
        Boğaziçi öğrencileri için ders notu paylaşma uygulaması
      </h1>

      <div className="max-w-3xl mx-auto my-6 p-4 text-lg md:text-2xl text-gray-600 text-center">
        <p className="mt-8 text-lg md:text-2xl text-gray-800">
          Ders notu aramak veya satmak için kendinizi yormayın.
          <br />
          BounNotes, Boğaziçi'ndeki çeşitli derslerin notlarını dijital ortamda
          satın alabileceğiniz ya da satabileceğiniz bir platformdur.
        </p>
        <p className="m-4 p-4 md:p-8 text-lg md:text-2xl text-gray-800">
          E-postası '@std.bogazici.edu.tr' ile biten herkes ekosistemimizden
          yararlanabilir.
        </p>
      </div>

      <div className="mx-4 mt-4 mb-6 p-4 text-lg md:text-2xl font-bold text-center max-w-3xl">
        ders notları almak ya da satmak için:
        <br />
        <br />
        <Link to="/login">
          <button className="bg-red-500 hover:bg-red-700 text-gray-800 px-6 py-3 rounded-lg shadow transition">
            giriş yapın
          </button>
        </Link>
        <br />
        <br />
        <p>hesabınız yoksa:</p>
        <br />
        <Link to="/register">
          <button className="bg-blue-500 text-gray-800 px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
            kayıt olun
          </button>
        </Link>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </main>
  );
}
