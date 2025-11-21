import Logo from "./Logo";
import { useFooterTexts } from "../../i18n/translations/common-files";

export default function Footer() {
  const { appDefinition, contactInfo, email, about, FAQ, copyrightMessage } =
    useFooterTexts();

  return (
    <footer className="w-full bg-linear-to-r from-cyan-300 via-blue-400 to-blue-600 text-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Üst Kısım - Logo ve Açıklama */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <div className="mb-4">
            <Logo />
          </div>
          <p className="text-base sm:text-lg lg:text-xl font-Prompt italic max-w-2xl">
            {appDefinition}
          </p>
        </div>

        {/* Middle Part - contact information */}
        <div className="mb-8 sm:mb-12 text-center">
          <p className="font-semibold text-lg mb-4">{contactInfo}</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm sm:text-base">
            <a
              href="https://www.linkedin.com/in/mehmet-ali-erfidan/"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/MehmetAliErfidan"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://x.com/mehmetaerfidan"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
          </div>
          <p className="mt-4 text-sm sm:text-base">
            {email}
            <a href="mailto:erfidan740@gmail.com" className="hover:underline">
              erfidan740@gmail.com
            </a>
          </p>
        </div>

        {/* Bottom Part - Links and Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-blue-700/30">
          <div className="flex gap-6 text-base sm:text-lg font-WDXL-Lubrifont-SC">
            <a href="/about" className="hover:underline">
              {about}
            </a>
            <a href="/faq" className="hover:underline">
              {FAQ}
            </a>
          </div>
          <p className="text-xs sm:text-sm">
            Powered by{" "}
            <strong className="font-Zalando-Sans-SemiExpanded">
              Mehmet Ali Erfidan
            </strong>
          </p>
          <p className="text-xs sm:text-sm">{copyrightMessage}</p>
        </div>
      </div>
    </footer>
  );
}
