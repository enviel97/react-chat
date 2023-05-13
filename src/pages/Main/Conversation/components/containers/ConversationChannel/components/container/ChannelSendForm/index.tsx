import { ButtonIconNeumorphism } from "@components/Button";
import useAppDispatch from "@hooks/useAppDispatch";
import { FC, memo, useCallback, useEffect } from "react";
import {
  ChannelForm,
  ChannelFormContainer,
} from "./styles/ChannelSendForm.decorate";
import ChannelChattingNotification from "./components/ui/ChanelChattingNotification";
import useCaretPosition from "./hooks/useCaretPosition";
import { FormProvider, useForm } from "react-hook-form";
import MessageAttachment from "./components/ui/MessageAttachment";
import PickerEmoji from "./components/ui/PickerEmoji";
import { TbSend } from "react-icons/tb";
import MessageInput from "./components/ui/MessageInput";
import { MESSAGE_FORM_SENDING } from "./common/form";

const ChannelSendForm: FC<ChannelSendFormProps> = ({ conversationId: id }) => {
  const dispatch = useAppDispatch();
  const caretPosition = useCaretPosition("message");
  const controller = useForm<ChannelSendFormValue>({
    defaultValues: { message: "", attachments: [] },
  });
  const { getValues, setValue, handleSubmit, resetField, setFocus, reset } =
    controller;

  const _handleSubmit = useCallback(
    (data: ChannelSendFormValue) => {
      if (data.attachments.length === 0 && data.message === "") return;
      console.log(data);
      /**
       * Handle submit here
       */

      // reset focus
      setFocus("message");
      reset();
    },
    [reset, setFocus]
  );

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
    <FormProvider {...controller}>
      <ChannelFormContainer>
        <ChannelChattingNotification />
        <MessageAttachment>
          <ChannelForm
            name={MESSAGE_FORM_SENDING}
            autoComplete='off'
            noValidate
            onSubmit={handleSubmit(_handleSubmit)}
          >
            <MessageInput conversationId={id} />
            <ButtonIconNeumorphism
              type='submit'
              size='2.5em'
              icon={<TbSend />}
            />
            <PickerEmoji
              onSelected={_onSelectedEmoji}
              height='25em'
              width='20em'
              lazyLoadEmojis
            />
          </ChannelForm>
        </MessageAttachment>
      </ChannelFormContainer>
    </FormProvider>
  );
};

export default memo(ChannelSendForm);
