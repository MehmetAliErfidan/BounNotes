projeye başlama tarihi: 29.10.2025 Çarşamba

Bu uygulama, benim (Mehmet Ali Erfidan) portföyüm için yaptığım bir projedir, para kazanma arzusu ile yapmıyorum fakat etrafıma bir iyilikte bulunmak isteğim bana bu uygulama fikrini verdi.
Bu uygulamanın yapımında yapay zeka kullanılmamıştır, ürünün teknik tarafı tamamen kişsel eforla oluşturulmuştur. Yapay zekaya sadece bazı stil önerileri ve teorik mantık yürütme için danıştım.

📘 BounNotes
BounNotes, Boğaziçi Üniversitesi öğrencileri için geliştirilmiş bir dijital platformdur. Öğrenciler bu platformda ders notlarını satabilir veya satın alabilir, böylece akademik kaynaklara kolayca erişebilirler.

🎯 Amaç
Bu proje, kişisel portfolyomu güçlendirmek amacıyla tamamen fullstack olarak tarafımdan geliştirilmiştir. Para kazanma hedefi ikinci planda olup, öncelikli amacım yazılım becerilerimi gerçek bir ürün üzerinden sergilemektir.

🚀 Özellikler
📚 Ders notu paylaşımı ve satışı

🔍 Not arama ve filtreleme

🛒 Dijital satın alma sistemi

🔐 Sadece @std.bogazici.edu.tr uzantılı e-posta adresleriyle giriş

🧑‍💻 Modern frontend ve backend mimarisi

🛠️ Teknolojiler
Katman Teknoloji
Frontend React, TypeScript, TailwindCSS
Routing React Router (react-router-dom)
Backend Node.js, Express
Veritabanı MongoDB
Kimlik Doğrulama JWT, Email doğrulama
📦 Kurulum
bash
git clone https://github.com/kullaniciadi/bounnotes.git
cd bounnotes
npm install
npm run dev
📚 Notlar
react-router-dom sadece Logo metni için yönlendirme amacıyla kullanılmıştır (Link bileşeni).

Uygulama BrowserRouter ile sarmalanmıştır.

Giriş yapabilmek için @std.bogazici.edu.tr uzantılı bir e-posta adresi gereklidir.

👨‍💻 Geliştirici
Mehmet Fullstack Developer & Boğaziçi öğrencisi Portfolyo odaklı, ürün geliştirme tutkusu olan bir yazılımcı

## Routing

Bu projede sadece `Logo` metni için yönlendirme amacıyla [`react-router-dom`](https://reactrouter.com/) kullanılmıştır. Uygulama `BrowserRouter` ile sarmalanmıştır ve `Link` bileşeni ana sayfaya yönlendirme sağlar.

## Dependencies

    -react-router-dom: SPA yönlendirme için kullanılır (`Link` bileşeni ile).

6.11.2025 itibariyle yapılan frontend sayfalar:
Landing Page ve
içinde:
navbar
footer
login page
register page
searchbar frontend kısmı
category filter frontend kısmı

08.11.2025 itibariyle yapılan frontend sayfalar:
CategoryFilter, searchbar ve LandingPage'de props ve state mantığı ayarlandı. Backend kurulursa frontend mantığı hazır. Kullanıcı kategori seçince bağlantılı veri ekranda gösteriliyor.
