import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/navbar/Navbar";
import { Main } from "../styles/GlobalStyles";
import { mockCurrentUser } from "../data/mockCurrentUser";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSummary from "../components/profile/ProfileSummary";
import ProfileEditForm from "../components/profile/ProfileEditForm";
import type { UserProfile } from "../config/user.types";

export default function ProfilePage() {
  const [user, setUser] = useState(mockCurrentUser);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleSave = (updatedProfile: UserProfile) => {
    // backend gelince: PUT /me/profile
    setUser({ ...user, profile: updatedProfile });
    setIsEditing(false);
  };

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
            onSave={handleSave}
          />
        )}

        <button onClick={() => navigate("/my-notes")}>Notlarım</button>
      </Main>
    </>
  );
}
