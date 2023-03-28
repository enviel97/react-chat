const UserStatus = "active" | "not-disturb" | "waiting";

interface UserProfileCommon extends Identity, TimeStamp {
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
