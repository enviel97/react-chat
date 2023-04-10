import { memo } from "react";
import { useForm, useFormContext } from "react-hook-form";
import EditableProfileField from "./components/ui/EditableProfileField";
import { ProfileDetailContainer } from "./styles/ProfileDetail.decorate";

const ProfileDetail = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  return (
    <ProfileDetailContainer>
      <EditableProfileField
        type='text'
        label={"Username"}
        placeholder='This field will be not empty...'
        register={register("username", { required: "Username is required" })}
      />
      <EditableProfileField
        type='textarea'
        label={"Bio"}
        placeholder={"How are you today ..."}
        maxLines={5}
        register={register("bio")}
      />
    </ProfileDetailContainer>
  );
};

export default memo(ProfileDetail);
