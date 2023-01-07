import { ButtonIconNeumorphism } from "@components/Button";
import { TextFieldNeumorphism } from "@components/TextInput";
import { Event } from "@core/common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { fetchAddMessages } from "@store/repo/message";
import { FC, FormEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TbSend } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { ChannelFormContainer } from "../../styles/Channel.decorate";
import ChannelChattingNotification from "./ChanelChattingNotification";

interface SendingValue {
  message: string;
}

interface ChannelSendFormProps {
  conversationId: string;
}

let timeoutId: NodeJS.Timer | undefined;

const ChannelSendForm: FC<ChannelSendFormProps> = ({ conversationId: id }) => {
  const {
    register,
    setFocus,
    resetField,
    getValues,
    formState: { isSubmitting },
  } = useForm<SendingValue>({
    defaultValues: { message: "" },
  });
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const resetValue = () => {
    setFocus("message");
    resetField("message");
  };

  useEffect(resetValue, [id, setFocus, resetField]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = getValues("message");
    if (!value) return;
    dispatch(
      fetchAddMessages({
        conversationId: id,
        message: value,
      })
    );
    resetValue();
  };

  const _sendTypingNotification = () => {
    if (timeoutId) clearTimeout(timeoutId);
    if (!timeoutId) {
      socket.emit(Event.EVENT_USER_TYPING_START, {
        conversationId: id,
      });
    }
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      socket.emit(Event.EVENT_USER_TYPING_STOP, {
        conversationId: id,
      });
    }, 500);
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
            onChange: _sendTypingNotification,
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
