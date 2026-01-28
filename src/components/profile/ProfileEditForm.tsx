import { useState } from "react";
import type { UserProfile } from "../../config/user.types";
import { Input } from "../../styles/GlobalStyles";
import * as S from "./!ProfileEditForm.styled";
import { PROFILE_EDIT_FORM_TEXTS } from "../../i18n/translations/profile/user-profile/ProfileEditForm";
import { useLang } from "../../i18n";

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
  const { lang } = useLang();
  const {
    editProfile,
    fullName,
    department,
    grade,
    favoriteCourse,
    favoriteProfessor,
    favoritePlace,
    about,
  } = PROFILE_EDIT_FORM_TEXTS[lang];

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
      <h2>{editProfile}</h2>

      <Input
        placeholder={fullName}
        value={form.fullName ?? ""}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
      />

      <Input
        placeholder={department}
        value={form.department ?? ""}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />

      <Input
        placeholder={grade}
        value={form.grade ?? ""}
        onChange={(e) => setForm({ ...form, grade: e.target.value })}
      />

      <Input
        placeholder={favoriteCourse}
        value={form.favoriteClass ?? ""}
        onChange={(e) => setForm({ ...form, favoriteClass: e.target.value })}
      />

      <Input
        placeholder={favoriteProfessor}
        value={form.favoriteTeacher ?? ""}
        onChange={(e) => setForm({ ...form, favoriteTeacher: e.target.value })}
      />

      <Input
        placeholder={favoritePlace}
        value={form.favoriteHangoutPlace ?? ""}
        onChange={(e) =>
          setForm({ ...form, favoriteHangoutPlace: e.target.value })
        }
      />

      <S.Textarea
        placeholder={about}
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
