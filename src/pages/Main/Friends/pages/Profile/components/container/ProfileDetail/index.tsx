import { memo } from "react";
import { useFormContext } from "react-hook-form";
import EditableProfileField from "./components/ui/EditableProfileField";
import { ProfileDetailContainer } from "./styles/ProfileDetail.decorate";

const ProfileDetail = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileEditable>();

  return (
    <ProfileDetailContainer>
      <EditableProfileField
        type='text'
        label={"Display Name"}
        placeholder='This field will be not empty...'
        register={register("displayName", {
          required: "Display name is required",
        })}
        errorMessage={errors.displayName?.message}
      />
      <EditableProfileField
        type='textarea'
        label={"Bio"}
        placeholder={"How are you today ..."}
        maxLines={5}
        register={register("bio")}
        errorMessage={errors.bio?.message}
      />
    </ProfileDetailContainer>
  );
};

export default memo(ProfileDetail);
