import useAppSelector from "@hooks/useAppSelector";
import { selectProfile, selectUser } from "@store/slices/profiles";
import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AccountDetail from "./components/container/AccountDetail";
import ProfileDetail from "./components/container/ProfileDetail";
import {
  ProfileContainer,
  MainContainer,
  EditableContainer,
} from "./styles/Profile.decorate";

const Profile = () => {
  const profile = useAppSelector(selectProfile);
  const user = useAppSelector(selectUser);
  const formRef = useForm<ProfileEditable>({
    mode: "onBlur",
    defaultValues: {
      bio: profile.bio ?? "",
      displayName: profile.displayName ?? user.getFullName(),
    },
  });

  return (
    <ProfileContainer>
      {/* Account part */}
      <MainContainer>
        <AccountDetail />
      </MainContainer>

      <FormProvider {...formRef}>
        {/* Profile part */}
        <EditableContainer>
          <ProfileDetail />
        </EditableContainer>
      </FormProvider>
    </ProfileContainer>
  );
};

export default memo(Profile);
