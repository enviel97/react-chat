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
import { fetchAddMessages } from "@store/repo/message";
import string from "@utils/string";
import useAttachment from "../../../hooks/useAttachments";

const ChannelSendForm: FC<ChannelSendFormProps> = ({ conversationId: id }) => {
  const dispatch = useAppDispatch();
  const caretPosition = useCaretPosition("message");
  const { files, clear } = useAttachment();

  const controller = useForm<ChannelSendFormValue>({
    defaultValues: { message: "", attachments: [] },
  });

  const { getValues, setValue, handleSubmit, setFocus, reset } = controller;

  useEffect(() => {
    setValue(
      "attachments",
      files.map(([, file]) => file)
    );
  }, [setValue, files]);

  const _handleSubmit = useCallback(
    async (data: ChannelSendFormValue) => {
      console.log({ data });
      if (data.attachments.length === 0 && data.message === "") return;

      /**
       * Handle submit here
       */
      dispatch(
        fetchAddMessages({
          tempId: string.genId("Temp"),
          conversationId: id,
          message: data.message,
          attachments: data.attachments,
        })
      );
      // reset focus
      clear();
      setFocus("message");
      reset();
    },
    [reset, setFocus, id, dispatch, clear]
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
            onSubmit={handleSubmit(_handleSubmit, (errors) => {
              console.log(errors);
            })}
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
