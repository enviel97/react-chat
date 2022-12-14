import { ButtonIconNeumorphism } from "@components/Button";
import { TextFieldNeumorphism } from "@components/TextInput";
import useAppSelector from "@hooks/useAppSelector";
import { isLoading } from "@utils/validate";
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
  const status = useAppSelector((state) => state.message.process);

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
          disabled={isLoading(status)}
        />
        <ButtonIconNeumorphism
          type='submit'
          icon={<TbSend />}
          textColor='primary'
          disabled={isLoading(status)}
        />
      </form>
    </ChannelFormContainer>
  );
};

export default ChannelSendForm;
