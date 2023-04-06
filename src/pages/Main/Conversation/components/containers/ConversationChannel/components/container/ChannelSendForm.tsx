import { ButtonIconNeumorphism } from "@components/Button";
import { TextFieldNeumorphism } from "@components/TextInput";
import useAppDispatch from "@hooks/useAppDispatch";
import { fetchAddMessages } from "@store/repo/message";
import string from "@utils/string";
import { FC, useCallback } from "react";
import { TbSend } from "react-icons/tb";
import {
  ChannelForm,
  ChannelFormContainer,
  ChannelSendingContainer,
} from "../../styles/Channel.decorate";
import ChannelChattingNotification from "./ChanelChattingNotification";
import PickerEmoji from "../ui/PickerEmoji";
import useFormSendMessageController from "../../hooks/useFormSendMessageController";
import useSendNotificationTyping from "../../hooks/useSendNotificationTyping";
import useCaretPosition from "../../hooks/useCaretPosition";

interface ChannelSendFormProps {
  conversationId: string;
}

const ChannelSendForm: FC<ChannelSendFormProps> = ({ conversationId: id }) => {
  const dispatch = useAppDispatch();
  const handleOnChange = useSendNotificationTyping(id);
  const caretPosition = useCaretPosition("message");

  const { setValue, getValues, register, isSubmitting, handleSubmit, lines } =
    useFormSendMessageController({
      conversationId: id,
      onChange: handleOnChange,
      onSubmit(value: string) {
        dispatch(
          fetchAddMessages({
            tempId: string.genId("Temp"),
            conversationId: id,
            message: value.trim(),
          })
        );
      },
    });

  const _onSelectedEmoji = useCallback(
    (emoji: string) => {
      const currentMessage = getValues("message");
      const newValue = ` ${emoji} `;
      setValue(
        "message",
        currentMessage.insert(newValue, caretPosition.current!)
      );
      caretPosition.current! += newValue.length;
    },
    [getValues, setValue, caretPosition]
  );

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
            register={register}
          />
          <ButtonIconNeumorphism
            type='submit'
            size='2.5em'
            icon={<TbSend />}
            textColor='primary'
            disabled={isSubmitting}
            onClick={handleSubmit}
          />
        </ChannelForm>
        <PickerEmoji onSelected={_onSelectedEmoji} height='25em' width='20em' />
      </ChannelSendingContainer>
    </ChannelFormContainer>
  );
};

export default ChannelSendForm;
