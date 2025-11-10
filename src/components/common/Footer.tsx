import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-12 sm:mt-20 w-full bg-[linear-gradient(to_right,#67e8f9_0%,#67e8f9_33.33%,#60a5fa_33.33%,#60a5fa_90.00%,#2563eb_90.00%,#2563eb_100%)] text-gray-800">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 p-6 sm:p-8 lg:p-12">
        {/*Logo ve Powered by*/}
        <div className="w-full lg:w-auto">
          <div className="mb-6">
            <Logo />
          </div>
          <p className="text-sm sm:text-base">
            Powered by{" "}
            <strong className="font-Zalando-Sans-SemiExpanded">
              Mehmet Ali Erfidan
            </strong>
          </p>
        </div>

        {/* Ana İçerik */}
        <div className="w-full lg:flex-1 space-y-6">
          <p className="font-Prompt text-lg sm:text-xl italic">
            Boğaziçi Öğrencileri İçin Ders Notu Paylaşımını Kolaylaştıran
            Platform
          </p>

          {/* İletişim */}
          <div>
            <p className="font-semibold mb-3">İLETİŞİM</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
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
                X (Twitter)
              </a>
              <a
                href="mailto:erfidan740@gmail.com"
                className="hover:underline break-all"
              >
                erfidan740@gmail.com
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-sm mt-6">
            © Mehmet Ali Erfidan. Tüm hakları saklıdır.
          </p>
        </div>

        <div className="w-full lg:w-auto text-base sm:text-xl font-WDXL-Lubrifont-SC space-y-3">
          <a className="block hover:underline">Hakkında</a>
          <a className="block hover:underline">SSS</a>
        </div>
      </div>
    </footer>
  );
}
