import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { MenuWrapper, MenuItem } from "./!UserMenuPortal.styled";
import { User, ReceiptText, LogOut } from "lucide-react";
import { useLang } from "../../../i18n";
import { USER_MENU_PORTAL_TEXTS } from "../../../i18n/translations/common/navbar/UserMenuPortal";

type Props = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onLogout: () => void;
  onClose: () => void;
};

export default function UserMenuPortal({
  anchorEl,
  open,
  onLogout,
  onClose,
}: Props) {
  const navigate = useNavigate();
  const { lang } = useLang();
  const { MyProfile, MyNotes, Logout } = USER_MENU_PORTAL_TEXTS[lang];

  const [pos, setPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const handleMyNotes = () => {
    return navigate("/my-notes");
  };

  useLayoutEffect(() => {
    if (!open || !anchorEl) return;

    const rect = anchorEl.getBoundingClientRect();
    const menuWidth = 180;
    const gap = 8;

    let top = rect.bottom + gap;

    let left = rect.right - menuWidth;

    left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));

    const estimatedMenuHeight = 140;

    if (top + estimatedMenuHeight > window.innerHeight - 8) {
      top = rect.top - estimatedMenuHeight - gap;
    }

    setPos({ top, left });
  }, [open, anchorEl]);

  useLayoutEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const menu = document.getElementById("user-menu-portal");
      if (
        menu &&
        !menu.contains(target) &&
        anchorEl &&
        !anchorEl.contains(target)
      ) {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, onClose, anchorEl]);

  if (!open) return null;

  return createPortal(
    <MenuWrapper
      id="user-menu-portal"
      $top={pos.top}
      $left={pos.left}
      role="menu"
    >
      <MenuItem className="flex gap-3" type="button">
        <User size={16} /> {MyProfile}
      </MenuItem>
      <MenuItem className="flex gap-3" type="button" onClick={handleMyNotes}>
        <ReceiptText size={16} /> {MyNotes}{" "}
      </MenuItem>
      <MenuItem className="flex gap-3" type="button" danger onClick={onLogout}>
        <LogOut size={16} /> {Logout}
      </MenuItem>
    </MenuWrapper>,
    document.body
  );
}
