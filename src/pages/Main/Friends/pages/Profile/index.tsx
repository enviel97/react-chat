import { memo } from "react";
import { FriendPageTitle } from "../../styles/FriendPage.decorate";
import { ProfileContainer } from "./styles/Profile.decorate";
// https://codesandbox.io/s/upbeat-marco-83uju3?file=/src/App.js
const Profile = () => {
  return (
    <ProfileContainer>
      <FriendPageTitle>Profile</FriendPageTitle>
    </ProfileContainer>
  );
};

export default memo(Profile);
