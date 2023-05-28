import { createContext, FC, useCallback, useMemo } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { DragAndDropZoneContainer } from "../../styles/DragAndDrop.decorate";
import {
  ACCEPT,
  MAX_FILE_IN_ONE_MESSAGE,
  MAX_FILE_SIZE,
} from "./common/config.default";
import DropNotification from "./components/DropNotification";
import ToastAttachmentError from "./components/ToastAttachmentError";
import useAttachmentReducer from "./hooks/useAttachmentsReducer";

export const AttachmentContext = createContext<AttachmentContextProps>({
  files: [],
  quantity: 0,
  clear: () => {
    throw new Error("Method un implement");
  },
  remove: (_: string) => {
    throw new Error("Method un implement");
  },
  open: () => {
    throw new Error("Method un implement");
  },
});

export const AttachmentsProvider: FC<AttachmentProviderProps> = ({
  children,
  accepts,
}) => {
  const { getSelector, addAttachments, clearAttachments, removeAttachments } =
    useAttachmentReducer();
  const { selectAttachments } = getSelector();

  const handleSelectedImage = useCallback(
    async (acceptFiles: File[]) => {
      toast.clearWaitingQueue();
      const totalInAttachmentBucket =
        acceptFiles.length + selectAttachments.length;
      if (totalInAttachmentBucket > MAX_FILE_IN_ONE_MESSAGE) {
        toast.error(`Too many file exceed (max: ${MAX_FILE_IN_ONE_MESSAGE})`);
        return;
      }
      addAttachments(acceptFiles);
    },
    [addAttachments, selectAttachments.length]
  );

  const handleValidateDrop = useCallback((fileRejected: FileRejection[]) => {
    fileRejected.forEach((error) => {
      toast.error(<ToastAttachmentError fileReject={error} />, {
        bodyStyle: { width: "fit-content" },
      });
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: handleOpen,
  } = useDropzone({
    onDrop: handleSelectedImage,
    multiple: true,
    accept: accepts?.reduce((accepts, type) => {
      return { ...accepts, ...ACCEPT[type] };
    }, {}),
    maxSize: MAX_FILE_SIZE,
    onDropRejected: handleValidateDrop,
    noClick: true,
  });

  const value = useMemo(
    () => ({
      files: selectAttachments,
      quantity: selectAttachments.length,
      open: handleOpen,
      remove: removeAttachments,
      clear: clearAttachments,
    }),
    [selectAttachments, handleOpen, removeAttachments, clearAttachments]
  );

  return (
    <AttachmentContext.Provider value={value}>
      <DragAndDropZoneContainer {...getRootProps()}>
        {children}
        <input {...getInputProps()} />
        {isDragActive && <DropNotification />}
      </DragAndDropZoneContainer>
    </AttachmentContext.Provider>
  );
};
