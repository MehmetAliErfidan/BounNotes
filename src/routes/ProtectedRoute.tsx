import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../features/hooks";
import { useLang } from "../i18n";
import { PROTECTED_ROUTE_TEXTS } from "../i18n/translations/routes/ProtectedRoute";

export default function ProtectedRoute() {
  const { lang } = useLang();
  const { loadingText } = PROTECTED_ROUTE_TEXTS[lang];
  const user = useAppSelector((state) => state.auth.user);
  const isHydrating = useAppSelector((state) => state.auth.isHydrating);

  if (isHydrating) {
    return <p>{loadingText}</p>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
