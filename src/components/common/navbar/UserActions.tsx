import { useRef, useState } from "react";
import UserAvatar from "./UserAvatar";
import UserMenuPortal from "./UserMenuPortal";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAppDispatch } from "../../../features/hooks";
import { clearUser } from "../../../features/auth/authSlice";

export default function UserActions() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const avatarBtnRef = useRef<HTMLButtonElement | null>(null);
  //Mock user data until backend
  const mockUser = {
    username: "Mehmet",
    avatarUrl: "",
  };

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
        <UserAvatar
          username={mockUser.username}
          avatarUrl={mockUser.avatarUrl}
        />
      </button>

      <UserMenuPortal
        anchorEl={avatarBtnRef.current}
        open={open}
        onClose={() => setOpen(false)}
        onLogout={() => {
          dispatch(clearUser());
          setOpen(false);
        }}
      />

      <LanguageSwitcher />
    </div>
  );
}
