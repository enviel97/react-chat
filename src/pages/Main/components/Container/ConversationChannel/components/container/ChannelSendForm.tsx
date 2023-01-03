import { ButtonIconNeumorphism } from "@components/Button";
import { TextFieldNeumorphism } from "@components/TextInput";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TbSend } from "react-icons/tb";
import { ChannelFormContainer } from "../../styles/Channel.decorate";
import ChannelChattingNotification from "./ChanelChattingNotification";

interface ChannelSendFormProps {
  onConfirm: (message: string) => void;
  onChanged: () => void;
}

const ChannelSendForm: FC<ChannelSendFormProps> = ({
  onConfirm,
  onChanged,
}) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting },
  } = useForm<{
    message: string;
  }>({
    defaultValues: { message: "" },
  });

  useEffect(() => {
    setFocus("message");
  }, [setFocus]);

  const onSubmit = (data: { message: string }) => {
    onConfirm(data.message);
  };

  return (
    <ChannelFormContainer>
      <ChannelChattingNotification />
      <form
        className='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete='off'
      >
        <TextFieldNeumorphism
          className='message-input'
          label='Send message'
          fontSize='1.2rem'
          register={register("message", {
            disabled: isSubmitting,
            onChange: onChanged,
          })}
        />
        <ButtonIconNeumorphism
          type='submit'
          icon={<TbSend />}
          textColor='primary'
          disabled={isSubmitting}
        />
      </form>
    </ChannelFormContainer>
  );
};

export default ChannelSendForm;
