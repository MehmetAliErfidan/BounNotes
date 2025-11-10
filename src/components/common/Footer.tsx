import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 w-full bg-[linear-gradient(to_right,#67e8f9_0%,#67e8f9_33.33%,#60a5fa_33.33%,#60a5fa_90.00%,#2563eb_90.00%,#2563eb_100%)] text-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="mb-14 ml-16 mt-2">
          <div className="mx-20 mb-4 p-6">
            <Logo />
          </div>
          <p className="mx-auto">
            Powered by{" "}
            <strong className="font-Zalando-Sans-SemiExpanded">
              Mehmet Ali Erfidan
            </strong>
          </p>
        </div>

        <div className="mr-16 my-auto p-4">
          <p className="font-Prompt text-xl italic p-6">
            Boğaziçi Öğrencileri İçin Ders Notu Paylaşımını Kolaylaştıran
            Platform
          </p>
          <div className="my-8 items-center">
            <p>İLETİŞİM</p>
            <br />
            <ol className="flex justify-between items-center">
              <li>
                <a href="https://www.linkedin.com/in/mehmet-ali-erfidan/">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/MehmetAliErfidan">GitHub</a>
              </li>
              <li>
                <a href="https://x.com/mehmetaerfidan">X</a>
              </li>
              <li>
                E-posta Adresi:
                <a href="mailto:erfidan740@gmail.com"> erfidan740@gmail.com</a>
              </li>
            </ol>
          </div>
          <div className="mt-6">
            <p>© Mehmet Ali Erfidan. Tüm hakları saklıdır.</p>
          </div>
        </div>

        <div className="mr-16 my-auto text-xl font-WDXL-Lubrifont-SC">
          <a className="block mt-2 hover:underline">Hakkında</a>
          <a className="block my-4 hover:underline">SSS</a>
        </div>
      </div>
    </footer>
  );
}
