import type { NoteWithContext } from "../config/note.types";
import type { CurrentUser } from "../config/user.types";

export const dummyData: NoteWithContext[] = [
  {
    note: {
      id: 1,
      title: "Matematik 1 Final Notları",
      course: "Matematik",
      term: "summer",
      year: 2024,
      teacher: "Ahmet",
      description: "Bu notlar sınavda çıkan tüm önemli konuları içerir.",
      price: 10,
      createdAt: "2024",
      owner: { id: 1, username: "Ali" },
      stats: { likeCount: 34, dislikeCount: 5 },
    },
    context: { isOwner: true, isPurchased: false, isLiked: false },
  },
  {
    note: {
      id: 2,
      title: "Fizik 2 Özet",
      course: "Fizik",
      term: "spring",
      year: 2025,
      teacher: "Mehmet",
      description: "Kısa ama etkili bir özet.",
      price: 40,
      createdAt: "2023",
      owner: { id: 2, username: "Ayşe" },
      stats: { likeCount: 21, dislikeCount: 14 },
    },
    context: { isOwner: true, isPurchased: false, isLiked: false },
  },
  {
    note: {
      id: 3,
      title: "Kimya Final Notları",
      course: "Kimya",
      term: "fall",
      year: 2025,
      teacher: "Samet",
      description: "kimyadır...",
      price: 45,
      createdAt: "2024",
      owner: { id: 3, username: "Veli" },
      stats: { likeCount: 19, dislikeCount: 41 },
    },
    context: { isOwner: false, isPurchased: false, isLiked: false },
  },
  {
    note: {
      id: 4,
      title: "CE 408 Notları",
      course: "Chemical Engineering",
      term: "spring",
      year: 2024,
      teacher: "Prof. Gökhan",
      description:
        "Çok faydalı notlardır, bana finali kazandırdı, alın rahatlayın.",
      price: 200,
      createdAt: "2025",
      owner: { id: 4, username: "Yavuz Göktürk" },
      stats: { likeCount: 42, dislikeCount: 0 },
    },
    context: { isOwner: false, isPurchased: true, isLiked: false },
  },
];

export const mockCurrentUser: CurrentUser = {
  id: 1,
  email: "ali@example.com",
  username: "Ali",
  profile: {
    fullName: null,
    department: null,
    grade: null,
    favoriteClass: null,
    favoriteTeacher: null,
    favoriteHangoutPlace: null,
    bio: null,
    avatarUrl: null,
  },
};
