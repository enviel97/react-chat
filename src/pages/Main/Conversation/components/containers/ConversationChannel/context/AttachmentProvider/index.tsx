import { InputFile } from "@components/Input";
import {
  createContext,
  DragEventHandler,
  FC,
  useCallback,
  useRef,
} from "react";
import { toast } from "react-toastify";
import { DragAndDropZoneContainer } from "../../styles/DragAndDrop.decorate";
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

const MAX_FILE_SIZE = 1024 * 1024 * 2; /** 2MB */
const MAX_FILE_IN_ONE_MESSAGE = 15;

export const AttachmentsProvider: FC<Components> = ({ children }) => {
  const inputRef = useRef<FileInputRef>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const { getSelector, addAttachments, clearAttachments, removeAttachments } =
    useAttachmentReducer();
  const { selectAttachments, selectAttachmentsQuantity } = getSelector();

  const handleOnDragFileToZone = (event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
    console.log({ drag_event: event });
  };

  const handleOnDropFileToZone: DragEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log({ drag_event: event });
  };

  const handleSelectedImage = useCallback(
    async (files: File[]) => {
      const quantity = selectAttachmentsQuantity;
      if (quantity + files.length >= MAX_FILE_IN_ONE_MESSAGE) {
        toast.error(`You can't send more than ${MAX_FILE_IN_ONE_MESSAGE}`);
        return;
      }
      addAttachments(files);
    },
    [addAttachments, selectAttachmentsQuantity]
  );

  const handleOpen = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.onOpenBrowser();
  }, []);

  return (
    <AttachmentContext.Provider
      value={{
        files: selectAttachments,
        quantity: selectAttachmentsQuantity,
        open: handleOpen,
        remove: removeAttachments,
        clear: clearAttachments,
      }}
    >
      <DragAndDropZoneContainer ref={dropzoneRef}>
        {children}
        <InputFile
          ref={inputRef}
          selectedFile={handleSelectedImage}
          maxSize={MAX_FILE_SIZE}
          multiple
          allowSelectDuplicate
        />
      </DragAndDropZoneContainer>
    </AttachmentContext.Provider>
  );
};
