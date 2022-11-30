import { ButtonIconNeumorphism } from "@components/Button";
import { TextFieldNeumorphism } from "@components/TextInput";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { TbSend } from "react-icons/tb";
import styled from "styled-components";
import { ChannelFormContainer } from "../../styles/Channel.decorate";

interface ChannelSendFormProps {
  onConfirm: (message: string) => void;
}

const SendText = styled(TextFieldNeumorphism)``;

const ChannelSendForm: FC<ChannelSendFormProps> = ({ onConfirm }) => {
  const { register, handleSubmit } = useForm<{ message: string }>();

  const onSubmit = (data: { message: string }) => {
    onConfirm(data.message);
  };

  return (
    <ChannelFormContainer>
      <form
        className='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete='off'
      >
        <SendText label='Send message' register={register("message")} />
        <ButtonIconNeumorphism
          type='submit'
          icon={<TbSend />}
          textColor='primary'
        />
      </form>
    </ChannelFormContainer>
  );
};

export default ChannelSendForm;
