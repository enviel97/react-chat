const UserStatus = "active" | "not-disturb" | "waiting";

interface UserProfileCommon {
  bio?: string;
  status?: UserStatus;
  avatar?: string;
}

interface UserProfile extends UserProfileCommon {
  user: User;
}

interface IUserProfile extends UserProfileCommon {
  user: string;
}
