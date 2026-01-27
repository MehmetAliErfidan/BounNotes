import { useNavigate } from "react-router-dom";

export default function useOpenUserProfile() {
  const navigate = useNavigate();

  return (username: string) => {
    navigate(`/users/${username}`);
  };
}
