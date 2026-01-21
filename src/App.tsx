import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MarketPage from "./pages/MarketPage.tsx";
import NoteDetailPage from "./pages/NoteDetailPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import { store } from "./features/store.ts";
import MyNotesPage from "./pages/MyNotesPage.tsx";
import NoteUploadPage from "./pages/NoteUploadPage.tsx";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/search" element={<MarketPage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
          <Route path="/note/:id/buy" element={<CheckoutPage />} />
          <Route path="/my-notes" element={<MyNotesPage />} />
          <Route path="/my-notes/upload" element={<NoteUploadPage />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
