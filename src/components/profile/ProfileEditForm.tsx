import { useState } from "react";
import type { UserProfile } from "../../config/user.types";
import { Input } from "../../styles/GlobalStyles";
import * as S from "./!ProfileEditForm.styled";

type Props = {
  initialProfile: UserProfile | null;
  onCancel: () => void;
  onSave: (profile: UserProfile) => void;
};

export default function ProfileEditForm({
  initialProfile,
  onCancel,
  onSave,
}: Props) {
  const [form, setForm] = useState<UserProfile>({
    fullName: initialProfile?.fullName ?? "",
    department: initialProfile?.department ?? "",
    grade: initialProfile?.grade ?? "",
    favoriteClass: initialProfile?.favoriteClass ?? "",
    favoriteTeacher: initialProfile?.favoriteTeacher ?? "",
    favoriteHangoutPlace: initialProfile?.favoriteHangoutPlace ?? "",
    bio: initialProfile?.bio ?? "",
    avatarUrl: initialProfile?.avatarUrl ?? "",
  });

  return (
    <S.Wrapper>
      <h2>Profili Düzenle</h2>

      <Input
        placeholder="Ad Soyad"
        value={form.fullName ?? ""}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />

      <Input
        placeholder="Bölüm"
        value={form.department ?? ""}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />

      <Input
        placeholder="Sınıf"
        value={form.grade ?? ""}
        onChange={(e) => setForm({ ...form, grade: e.target.value })}
      />

      <Input
        placeholder="Favori Ders"
        value={form.favoriteClass ?? ""}
        onChange={(e) => setForm({ ...form, favoriteClass: e.target.value })}
      />

      <Input
        placeholder="Favori Hoca"
        value={form.favoriteTeacher ?? ""}
        onChange={(e) => setForm({ ...form, favoriteTeacher: e.target.value })}
      />

      <Input
        placeholder="Kampüste En Sevilen Mekan"
        value={form.favoriteHangoutPlace ?? ""}
        onChange={(e) =>
          setForm({ ...form, favoriteHangoutPlace: e.target.value })
        }
      />

      <S.Textarea
        placeholder="Hakkımda"
        value={form.bio ?? ""}
        maxLength={250}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
      />

      <S.Actions>
        <S.ActionButton $variant="danger" onClick={onCancel}>
          Vazgeç
        </S.ActionButton>
        <S.ActionButton onClick={() => onSave(form)}>Kaydet</S.ActionButton>
      </S.Actions>
    </S.Wrapper>
  );
}
