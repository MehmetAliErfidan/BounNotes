import { useState } from "react";
import type { UserProfile } from "../../config/user.types";
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
    university: initialProfile?.university ?? "",
    bio: initialProfile?.bio ?? "",
  });

  return (
    <S.Wrapper>
      <h2>Profili Düzenle</h2>

      <S.Input
        placeholder="Ad Soyad"
        value={form.fullName ?? ""}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />

      <S.Input
        placeholder="Bölüm"
        value={form.department ?? ""}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />

      <S.Input
        placeholder="Üniversite"
        value={form.university ?? ""}
        onChange={(e) => setForm({ ...form, university: e.target.value })}
      />

      <S.Textarea
        placeholder="Hakkımda"
        value={form.bio ?? ""}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
      />

      <S.Actions>
        <button onClick={onCancel}>Vazgeç</button>
        <button onClick={() => onSave(form)}>Kaydet</button>
      </S.Actions>
    </S.Wrapper>
  );
}
