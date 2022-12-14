import { ButtonIconNeumorphism } from "@components/Button";
import { TextFieldNeumorphism } from "@components/TextInput";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TbSend } from "react-icons/tb";
import { ChannelFormContainer } from "../../styles/Channel.decorate";

interface ChannelSendFormProps {
  onConfirm: (message: string) => void;
}

const ChannelSendForm: FC<ChannelSendFormProps> = ({ onConfirm }) => {
  const { register, handleSubmit, reset, setFocus } = useForm<{
    message: string;
  }>({
    defaultValues: { message: "" },
  });

  useEffect(() => {
    setFocus("message");
  }, [setFocus]);

  const onSubmit = (data: { message: string }) => {
    onConfirm(data.message);
    reset();
  };

  return (
    <ChannelFormContainer>
      <form
        className='form'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete='off'
      >
        <TextFieldNeumorphism
          label='Send message'
          register={register("message")}
          fontSize='1.2rem'
        />
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
