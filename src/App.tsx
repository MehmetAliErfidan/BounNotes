import { Routes, Route } from "react-router-dom";
import { I18nProvider } from "./i18n";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

function App() {
  return (
    <I18nProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </I18nProvider>
  );
}

export default App;
