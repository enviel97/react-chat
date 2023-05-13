import {
  ChangeEventHandler,
  forwardRef,
  memo,
  MouseEventHandler,
  useRef,
  useImperativeHandle,
} from "react";
import { InvisibleInput } from "../styles/FileInput.decorate";

interface FileInputProps {
  multiple?: boolean;
  accept?: string;
  allowSelectDuplicate?: boolean;
  selectedFile?: (files: File[]) => void;
}

export interface FileInputRef {
  onOpenBrowser: () => void;
}

const FileInput = forwardRef<FileInputRef, FileInputProps>(
  ({ multiple, accept, allowSelectDuplicate, selectedFile }, controller) => {
    const ref = useRef<HTMLInputElement>(null);
    const handleClick: MouseEventHandler<HTMLInputElement> = (event) => {
      if (allowSelectDuplicate) {
        event.currentTarget.value = "";
      }
    };

    useImperativeHandle(
      controller,
      () => ({
        onOpenBrowser: () => {
          if (!ref.current) return;
          ref.current.click();
        },
      }),
      [ref]
    );

    const handlePickupFile: ChangeEventHandler<HTMLInputElement> = (event) => {
      if (!selectedFile) return;
      const pickupFiles = event.target.files;
      if (!pickupFiles || pickupFiles.length === 0) {
        selectedFile([]);
      } else {
        if (multiple) {
          selectedFile([
            ...Array.from(pickupFiles).reduce<File[]>((fileList, file) => {
              if (file) fileList.push(file);
              return fileList;
            }, []),
          ]);
        } else {
          selectedFile([pickupFiles.item(0)!]);
        }
      }
    };

    return (
      <InvisibleInput
        type='file'
        ref={ref}
        multiple={multiple}
        accept={accept}
        onClick={handleClick}
        onChange={handlePickupFile}
      />
    );
  }
);

export default memo(FileInput);
