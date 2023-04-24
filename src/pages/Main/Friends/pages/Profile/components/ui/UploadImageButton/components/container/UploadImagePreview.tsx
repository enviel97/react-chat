import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import {
  IconBox,
  PreviewContainer,
  UploadImageInput,
  UploadImageNotificationContainer,
  UploadImageNotification,
  UploadImagePreviewerContainer,
} from "../../styles/UploadImagePreview.decorate";
import {
  PreviewImageAnimation,
  PreviewAddButtonAnimation,
  PreviewAnimation,
} from "../../animation/UploadImagePreview.animate";
import { TbPhotoCancel, TbPhotoPlus } from "react-icons/tb";
import { AnimatePresence } from "framer-motion";

interface Props extends Components {
  initialSrc?: string;
  aspectRatio?: "1/1" | "16/9";
  onSelectImage?: (file?: File) => void;
}

const UploadImagePreview: FC<Props> = ({
  initialSrc,
  aspectRatio = "1/1",
  onSelectImage,
  children,
}) => {
  const [currentImage, setCurrentImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>(initialSrc ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const showPreview = useCallback((selectedFile: File) => {
    setPreviewImage(URL.createObjectURL(selectedFile));
    setCurrentImage(selectedFile);
  }, []);

  const clearImage = () => {
    setCurrentImage(undefined);
    onSelectImage && onSelectImage(undefined);
    setPreviewImage("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const selectImage = () => {
    const upload = inputRef.current;
    if (!upload) return;
    upload.click();
  };

  const onSelect = useCallback(
    (event: Event) => {
      const reactEvent: React.ChangeEvent<HTMLInputElement> = event as any;
      const selectedFile = reactEvent.target.files?.item(0);
      if (!selectedFile) return;
      onSelectImage && onSelectImage(selectedFile);
      showPreview(selectedFile);
    },
    [showPreview, onSelectImage]
  );

  // listen
  useEffect(() => {
    return () => {
      previewImage && URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  useEffect(() => {
    const upload = inputRef.current;
    if (!upload) return;
    upload.addEventListener("change", onSelect);
    return () => upload.removeEventListener("change", onSelect);
  }, [onSelect]);

  return (
    <UploadImagePreviewerContainer $aspectRatio={aspectRatio}>
      {previewImage && (
        <PreviewContainer {...PreviewImageAnimation}>
          <img
            src={previewImage}
            alt={"Preview select file"}
            onError={() => setPreviewImage("")}
          />
        </PreviewContainer>
      )}
      <UploadImageInput $hasPreview={!!previewImage}>
        <UploadImageNotificationContainer>
          <UploadImageNotification
            variants={PreviewAnimation.variants}
            animate={!!previewImage ? "hidden" : "visible"}
          >
            Drag & drop photos here or <strong>Browse</strong>
          </UploadImageNotification>
          <AnimatePresence>
            <UploadImageNotification layout>
              {currentImage && (
                <IconBox {...PreviewAddButtonAnimation} onClick={clearImage}>
                  <TbPhotoCancel size={"2.5em"} />
                </IconBox>
              )}
              <IconBox {...PreviewAddButtonAnimation} onClick={selectImage}>
                <TbPhotoPlus size={"2.5em"} />
              </IconBox>
            </UploadImageNotification>
          </AnimatePresence>
        </UploadImageNotificationContainer>

        <input ref={inputRef} type='file' accept='image/*' id='upload' />
      </UploadImageInput>
      {children}
    </UploadImagePreviewerContainer>
  );
};

export default memo(UploadImagePreview);
