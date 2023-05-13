import { createContext, FC, useCallback, useEffect, useReducer } from "react";
import { useFormContext } from "react-hook-form";
import { initState, AttachmentReducer } from "./attachment.reducer";

interface AddAttachmentsProps {
  prefixId?: string;
  files: File[];
}

interface Context {
  state: AttachmentState;
  removeAttachment: (payload: string) => void;
  addAttachments: (payload: AddAttachmentsProps) => void;
  clearAttachment: () => void;
}

export const AttachmentContext = createContext<Context>({
  state: [],
  removeAttachment: (payload: string) => {
    throw new Error("Method not implements");
  },
  addAttachments: (payload: { prefixId?: string; files: File[] }) => {
    throw new Error("Method not implements");
  },
  clearAttachment: () => {
    throw new Error("Method not implements");
  },
});

const AttachmentProvider: FC<Components> = ({ children }) => {
  const [state, dispatch] = useReducer(AttachmentReducer, initState);
  const {
    setValue,
    formState: { isSubmitting },
  } = useFormContext<ChannelSendFormValue>();

  const removeAttachment = useCallback(
    (payload: string) => {
      dispatch({ type: "REMOVE_ATTACHMENT", payload });
      setValue("attachments", []);
    },
    [setValue]
  );

  const addAttachments = useCallback(
    (payload: AddAttachmentsProps) => {
      const { prefixId, files } = payload;
      setValue("attachments", files);
      dispatch({
        type: "ADD_ATTACHMENT",
        payload: { prefixId, files },
      });
    },
    [setValue]
  );

  const clearAttachment = useCallback(() => {
    dispatch({ type: "CLEAR_ATTACHMENT" });
    setValue("attachments", []);
  }, [setValue]);

  useEffect(() => {
    if (isSubmitting) clearAttachment();
  }, [isSubmitting, clearAttachment]);

  return (
    <AttachmentContext.Provider
      value={{ state, removeAttachment, addAttachments, clearAttachment }}
    >
      {children}
    </AttachmentContext.Provider>
  );
};

export default AttachmentProvider;
