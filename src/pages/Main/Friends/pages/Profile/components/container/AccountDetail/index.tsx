import useAppSelector from "@hooks/useAppSelector";
import { selectUser, selectImage } from "@store/slices/profiles";
import { Fragment, memo } from "react";
import ProfileStatus from "./components/container/ProfileStatus";
import ProfileAvatar from "./components/ui/ProfileAvatar";
import TextField from "./components/ui/TextFieldLabel";
import Thumbnail from "./components/ui/Thumbnail";
import {
  AccountDetailContainer,
  AccountTextFieldGroup,
} from "./styles/AccountProfile.decorate";

const AccountDetail = () => {
  const user = useAppSelector(selectUser);
  const profileAvatar = useAppSelector((state) => selectImage(state, "avatar"));
  const profileBanner = useAppSelector((state) => selectImage(state, "banner"));

  return (
    <Fragment>
      <Thumbnail thumbnailSrc={profileBanner} />
      <ProfileAvatar avatarSrc={profileAvatar} />
      <AccountDetailContainer>
        <AccountTextFieldGroup>
          <TextField label='First Name' value={user.firstName} />
          <TextField label='Last Name' value={user.lastName} />
        </AccountTextFieldGroup>
        <TextField label='Email' value={user.email} />
        <ProfileStatus />
      </AccountDetailContainer>
    </Fragment>
  );
};

export default memo(AccountDetail);
