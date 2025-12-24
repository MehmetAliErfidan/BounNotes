import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MarketPage from "./pages/MarketPage.tsx";
import NoteDetailPage from "./pages/NoteDetailPage.tsx";
import { store } from "./features/store.ts";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<MarketPage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
