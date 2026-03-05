import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/navbar/Navbar";
import { Main } from "../styles/GlobalStyles";
import { MyNotesButton } from "./!ProfilePage.styled";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSummary from "../components/profile/ProfileSummary";
import ProfileEditForm from "../components/profile/ProfileEditForm";
import type { CurrentUser, UserProfile } from "../config/user.types";
import { PROFILE_PAGE_TEXTS } from "../i18n/translations/pages/ProfilePage";
import { useLang } from "../i18n";
import { API_BASE_URL } from "../config/api";
import { buildOptionalAuthHeaders } from "../features/auth/authRequest";

export default function ProfilePage() {
  const { lang } = useLang();
  const { myNotes } = PROFILE_PAGE_TEXTS[lang];

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(`${API_BASE_URL}/api/users/me/profile`, {
          headers: buildOptionalAuthHeaders(),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as {
            message?: string;
            error?: string;
          } | null;
          if (isMounted) {
            setError(data?.message || data?.error || "Failed to load profile.");
          }
          return;
        }

        const data = (await res.json()) as CurrentUser;
        if (isMounted) {
          setUser(data);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load profile.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (updatedProfile: UserProfile) => {
    try {
      setIsSaving(true);
      setError("");

      const res = await fetch(`${API_BASE_URL}/api/users/me/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...Object.fromEntries(
            new Headers(buildOptionalAuthHeaders()).entries(),
          ),
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          message?: string;
          error?: string;
        } | null;
        setError(data?.message || data?.error || "Failed to save profile.");
        return;
      }

      const data = (await res.json()) as CurrentUser;
      setUser(data);
      setIsEditing(false);
    } catch {
      setError("Failed to save profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Main>
          <p>Loading...</p>
        </Main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <Main>
          <p>{error}</p>
        </Main>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <Main>
          <p>Profile not found.</p>
        </Main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Main>
        <ProfileHeader user={user} />

        {!isEditing && (
          <ProfileSummary
            profile={user.profile}
            onEdit={() => setIsEditing(true)}
          />
        )}

        {isEditing && (
          <ProfileEditForm
            initialProfile={user.profile}
            onCancel={() => setIsEditing(false)}
            onSave={(profile) => {
              void handleSave(profile);
            }}
          />
        )}

        {isSaving ? <p>Saving...</p> : null}

        <MyNotesButton onClick={() => navigate("/my-notes")}>
          {myNotes}
        </MyNotesButton>
      </Main>
    </>
  );
}
