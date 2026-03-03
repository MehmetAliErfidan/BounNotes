import { useRef, useState } from "react";
import UserAvatar from "./UserAvatar";
import UserMenuPortal from "./UserMenuPortal";
import LanguageSwitcher from "./LanguageSwitcher";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../features/hooks";
import { clearUser } from "../../../features/auth/authSlice";
import { clearAccessToken } from "../../../features/auth/authStorage";

export default function UserActions() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const avatarBtnRef = useRef<HTMLButtonElement | null>(null);
  const username = user?.username ?? "User";
  const avatarUrl = user?.avatarUrl ?? "";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <button
        ref={avatarBtnRef}
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
        type="button"
      >
        <UserAvatar username={username} avatarUrl={avatarUrl} />
      </button>

      <UserMenuPortal
        anchorEl={avatarBtnRef.current}
        open={open}
        onClose={() => setOpen(false)}
        onLogout={() => {
          clearAccessToken();
          dispatch(clearUser());
          setOpen(false);
          navigate("/login");
        }}
      />
      <LanguageSwitcher />
    </div>
  );
}
