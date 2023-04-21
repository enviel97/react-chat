import useAppSelector from "@hooks/useAppSelector";
import { selectProfile, selectUser } from "@store/slices/profiles";
import { Fragment } from "react";
import DropdownAction from "./components/ui/DropdownAction";
import ProfileAvatar from "./components/ui/ProfileAvatar";
import TextField from "./components/ui/TextFieldLabel";
import Thumbnail from "./components/ui/Thumbnail";
import {
  AccountDetailContainer,
  AccountTextFieldGroup,
} from "./styles/AccountProfile.decorate";

const AccountDetail = () => {
  const profile = useAppSelector(selectProfile);
  const user = useAppSelector(selectUser);
  return (
    <Fragment>
      <Thumbnail src={profile.banner} />
      <ProfileAvatar avatarSrc={profile.avatar} />
      <AccountDetailContainer>
        <AccountTextFieldGroup>
          <TextField label='First Name' value={user.firstName} />
          <TextField label='Last Name' value={user.lastName} />
        </AccountTextFieldGroup>
        <TextField label='Email' value={user.email} />
        <DropdownAction defaultValue={profile.status ?? "active"} />
      </AccountDetailContainer>
    </Fragment>
  );
};

export default AccountDetail;
