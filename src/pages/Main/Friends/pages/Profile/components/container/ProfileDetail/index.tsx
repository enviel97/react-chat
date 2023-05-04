import { PromiseToast } from "@components/Toast/promise";
import useAppDispatch from "@hooks/useAppDispatch";
import { updateProfile } from "@store/repo/user";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import ConfirmUpdateBox from "./components/container/ConfirmUpdatedBox";
import EditableProfileField from "./components/ui/EditableProfileField";
import { ProfileDetailContainer } from "./styles/ProfileDetail.decorate";

const ProfileDetail = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useFormContext<ProfileEditable>();

  const handleSubmitProfileUpdate = (data: ProfileEditable) => {
    PromiseToast({
      action: async () => await dispatch(updateProfile(data)).unwrap(),
      pending: "Updating profile ...",
      onSuccess: (res: UserProfile) => {
        reset(data);
      },
      onError: () => {},
    });
  };
  return (
    <ProfileDetailContainer
      autoComplete='off'
      autoSave='off'
      onSubmit={handleSubmit(handleSubmitProfileUpdate)}
    >
      <EditableProfileField
        type='text'
        disabled={isSubmitting}
        label={"Display Name"}
        placeholder='Let us know how do I call you...'
        register={register("displayName", {
          required: "Display name is required",
        })}
        errorMessage={errors.displayName?.message}
      />
      <EditableProfileField
        type='textarea'
        disabled={isSubmitting}
        label={"Bio"}
        placeholder={"How are you today ..."}
        maxLines={5}
        register={register("bio")}
      />
      <ConfirmUpdateBox />
    </ProfileDetailContainer>
  );
};

export default memo(ProfileDetail);
