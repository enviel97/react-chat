import { ButtonIconNeumorphism } from "@components/Button";
import { TextFieldNeumorphism } from "@components/TextInput";
import { FC, FormEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TbSend } from "react-icons/tb";
import { useParams } from "react-router-dom";
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
  const { id } = useParams();
  const {
    register,
    setFocus,
    resetField,
    getValues,
    formState: { isSubmitting },
  } = useForm<{
    message: string;
  }>({
    defaultValues: { message: "" },
  });

  const resetValue = () => {
    setFocus("message");
    resetField("message");
  };

  useEffect(resetValue, [id, setFocus, resetField]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = getValues("message");
    if (!value) return;
    onConfirm(value);
    resetValue();
  };

  return (
    <ChannelFormContainer>
      <ChannelChattingNotification />
      <form className='form' onSubmit={onSubmit} noValidate autoComplete='off'>
        <TextFieldNeumorphism
          id='message'
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
