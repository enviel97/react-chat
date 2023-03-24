import { ButtonIconNeumorphism } from "@components/Button";
import { TextFieldNeumorphism } from "@components/TextInput";
import { Event } from "@common/socket.define";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { fetchAddMessages } from "@store/repo/message";
import string from "@utils/string";
import { FC, useCallback, useEffect, useRef, useState } from "react";
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
const maxLines = 4;
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

  const dispatch = useAppDispatch();
  const socket = useSocket();
  const caretPosition = useRef(0);
  const [lines, setLines] = useState(1);

  const resetValue = useCallback(() => {
    setFocus("message");
    resetField("message");
    setLines(1);
  }, [resetField, setFocus]);

  useEffect(resetValue, [id, resetValue]);

  const onSubmit = useCallback(() => {
    const value = getValues("message");
    if (!value) return;
    dispatch(
      fetchAddMessages({
        tempId: string.genId("Temp"),
        conversationId: id,
        message: value.trim(),
      })
    );
    resetValue();
  }, [dispatch, getValues, id, resetValue]);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        onSubmit();
      } else if (event.key === "Enter" || event.key === "Backspace") {
        const value = getValues("message");
        setLines((prev) => Math.min(value.split("\n").length, maxLines));
      }
    },
    [onSubmit, getValues]
  );
  const hookCaretPosition = useCallback(
    (event: any) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        caretPosition.current = target.selectionStart!;
      }
    },
    [caretPosition]
  );

  useEffect(() => {
    const input = document.getElementById("message");
    if (!input) return;
    const onKeydownEvent = (event: KeyboardEvent) => {
      hookCaretPosition(event);
      handleKeydown(event);
    };
    input.addEventListener("click", hookCaretPosition);
    input.addEventListener("keydown", onKeydownEvent);
    return () => {
      input.removeEventListener("click", hookCaretPosition);
      input.removeEventListener("keydown", onKeydownEvent);
    };
  }, [hookCaretPosition, handleKeydown]);

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
    () => _sendTypingNotification(),
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
        <ChannelForm className='form' noValidate autoComplete='off'>
          <TextFieldNeumorphism
            id='message'
            label='Enter message'
            type='rich'
            fontSize='1.2rem'
            maxLines={lines}
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
