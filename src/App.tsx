import { useEffect } from "react";
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
import ProfilePage from "./pages/ProfilePage.tsx";
import PublicProfilePage from "./pages/PublicProfilePage.tsx";
import NoteEditPage from "./pages/NoteEditPage.tsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.tsx";
import { clearUser, setUser, setHydrating } from "./features/auth/authSlice";
import {
  getAccessToken,
  clearAccessToken,
  getUserFromAccessToken,
} from "./features/auth/authStorage.ts";
import { meRequest, parseMeResponse } from "./features/auth/authApi.ts";

function App() {
  useEffect(() => {
    store.dispatch(setHydrating(true));
    const token = getAccessToken();
    if (!token) {
      store.dispatch(setHydrating(false));
      return;
    }

    const hydrateUser = async () => {
      try {
        const res = await meRequest();

        if (!res.ok) {
          clearAccessToken();
          store.dispatch(clearUser());
          return;
        }

        const data = await parseMeResponse(res);
        if (!data?.user) {
          clearAccessToken();
          store.dispatch(clearUser());
          return;
        }

        store.dispatch(
          setUser({
            id: String(data.user.id),
            username: data.user.username,
            avatarUrl: "",
          }),
        );
      } catch {
        const fallbackUser = getUserFromAccessToken();
        if (!fallbackUser) {
          clearAccessToken();
          store.dispatch(clearUser());
          return;
        }

        store.dispatch(
          setUser({
            id: fallbackUser.id,
            username: fallbackUser.username,
            avatarUrl: "",
          }),
        );
      } finally {
        store.dispatch(setHydrating(false));
      }
    };

    hydrateUser();
  }, []);

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/search" element={<MarketPage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
          <Route path="/note/:id/buy" element={<CheckoutPage />} />
          <Route path="/my-notes" element={<MyNotesPage />} />
          <Route path="/my-notes/upload" element={<NoteUploadPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users/:username" element={<PublicProfilePage />} />
          <Route path="/note/:id/edit" element={<NoteEditPage />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
