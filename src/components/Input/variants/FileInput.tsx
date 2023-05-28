import {
  ChangeEventHandler,
  forwardRef,
  memo,
  MouseEventHandler,
  useRef,
  useImperativeHandle,
} from "react";
import { InvisibleInput } from "../styles/FileInput.decorate";
import { fileInputFilter } from "../utils/FileInput.validate";

const FileInput = forwardRef<FileInputRef, FileInputProps>(
  (
    {
      multiple,
      accept,
      allowSelectDuplicate,
      selectedFile,
      maxSize,
      className,
    },
    controller
  ) => {
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
          ref.current?.click();
        },
      }),
      [ref]
    );

    const handlePickupFile: ChangeEventHandler<HTMLInputElement> = (event) => {
      if (!selectedFile) return;
      const pickupFiles = event.target.files;
      if (!pickupFiles || pickupFiles.length === 0) {
        selectedFile([]);
        return;
      }
      selectedFile([
        ...Array.from(pickupFiles).reduce<File[]>((fileList, file) => {
          const acceptFile = fileInputFilter(file, { maxSize: maxSize });
          if (acceptFile) fileList.push(acceptFile);
          return fileList;
        }, []),
      ]);
    };

    return (
      <InvisibleInput
        type='file'
        ref={ref}
        className={className}
        multiple={multiple}
        accept={accept}
        onClick={handleClick}
        onChange={handlePickupFile}
      />
    );
  }
);

export default memo(FileInput);
