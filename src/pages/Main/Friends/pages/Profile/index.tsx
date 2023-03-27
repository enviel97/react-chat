import { memo } from "react";
import { FriendPageTitle } from "../../styles/FriendPage.decorate";
import { ProfileContainer } from "./styles/Profile.decorate";

const Profile = () => {
  return (
    <ProfileContainer>
      <FriendPageTitle>Profile</FriendPageTitle>
    </ProfileContainer>
  );
};

export default memo(Profile);
