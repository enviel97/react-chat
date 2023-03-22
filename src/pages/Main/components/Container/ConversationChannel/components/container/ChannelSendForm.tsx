import { ButtonIconNeumorphism } from "@components/Button";
import { TextFieldNeumorphism } from "@components/TextInput";
import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { fetchAddMessages } from "@store/repo/message";
import string from "@utils/string";
import { FC, useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { TbSend } from "react-icons/tb";
import {
  ChannelForm,
  ChannelFormContainer,
  ChannelSendingContainer,
} from "../../styles/Channel.decorate";
import ChannelChattingNotification from "./ChanelChattingNotification";
import PickerEmoji from "../ui/PickerEmoji";

interface SendingValue {
  message: string;
}

interface ChannelSendFormProps {
  conversationId: string;
}

let timeoutId: NodeJS.Timeout | undefined;

const ChannelSendForm: FC<ChannelSendFormProps> = ({ conversationId: id }) => {
  const {
    register,
    setFocus,
    resetField,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm<SendingValue>({
    defaultValues: { message: "" },
  });

  const ref = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const socket = useSocket();
  const caretPosition = useRef(0);

  const resetValue = () => {
    setFocus("message");
    resetField("message");
  };

  useEffect(resetValue, [id, setFocus, resetField]);

  const onSubmit = () => {
    const value = getValues("message");
    if (!value) return;
    dispatch(
      fetchAddMessages({
        tempId: string.genId("Temp"),
        conversationId: id,
        message: value,
      })
    );
    resetValue();
  };

  const hookCaretPosition = useCallback(
    (event: any) => {
      caretPosition.current = event.target?.selectionStart!;
    },
    [caretPosition]
  );

  useEffect(() => {
    const input = ref.current?.getElementsByTagName("input")?.item(0);
    if (!input) return;
    input.addEventListener("keydown", hookCaretPosition);
    input.addEventListener("click", hookCaretPosition);
    return () => {
      input.removeEventListener("click", hookCaretPosition);
      input.addEventListener("keydown", hookCaretPosition);
    };
  }, [hookCaretPosition]);

  const _sendTypingNotification = useCallback(() => {
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
  }, [id, socket]);

  const onChange = useCallback(
    (event: any) => {
      _sendTypingNotification();
    },
    [_sendTypingNotification]
  );

  const _onSelectedEmoji = (emoji: string) => {
    const currentMessage = getValues("message");
    const newValue = ` ${emoji} `;
    setValue("message", currentMessage.insert(newValue, caretPosition.current));
    caretPosition.current += newValue.length;
  };

  return (
    <ChannelFormContainer>
      <ChannelChattingNotification />
      <ChannelSendingContainer>
        <ChannelForm ref={ref} className='form' noValidate autoComplete='off'>
          <TextFieldNeumorphism
            id='message'
            label='Send message'
            fontSize='1.2rem'
            register={register("message", {
              disabled: isSubmitting,
              onChange: onChange,
            })}
          />
          <ButtonIconNeumorphism
            type='submit'
            size='2.5em'
            icon={<TbSend />}
            textColor='primary'
            disabled={isSubmitting}
            onClick={onSubmit}
          />
        </ChannelForm>
        <PickerEmoji onSelected={_onSelectedEmoji} height='25em' width='20em' />
      </ChannelSendingContainer>
    </ChannelFormContainer>
  );
};

export default ChannelSendForm;
