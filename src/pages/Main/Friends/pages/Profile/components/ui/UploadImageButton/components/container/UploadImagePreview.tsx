import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  IconBox,
  PreviewContainer,
  UploadImageInput,
  UploadImageNotificationContainer,
  UploadImageNotificationText,
  UploadImagePreviewerContainer,
} from "../../styles/UploadImagePreview.decorate";
import {
  PreviewImageAnimation,
  PreviewAddButtonAnimation,
  PreviewAnimation,
} from "../../animation/UploadImagePreview.animate";
import { TbPhotoPlus } from "react-icons/tb";

interface Props {
  initialSrc?: string;
}

export type UploadImagePreviewController = {
  clearImage: () => void;
  getImage: () => File | undefined;
};

const UploadImagePreview = forwardRef<UploadImagePreviewController, Props>(
  ({ initialSrc }, ref) => {
    const [currentImage, setCurrentImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>(initialSrc ?? "");
    const inputRef = useRef<HTMLInputElement>(null);
    const showPreview = useCallback((selectedFile: File) => {
      setPreviewImage(URL.createObjectURL(selectedFile));
      setCurrentImage(selectedFile);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        clearImage() {
          setCurrentImage(undefined);
          setPreviewImage("");
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        },
        getImage() {
          return currentImage;
        },
      }),
      [currentImage, inputRef]
    );

    const onSelect = useCallback(
      (event: Event) => {
        const reactEvent: React.ChangeEvent<HTMLInputElement> = event as any;
        const selectedFile = reactEvent.target.files?.item(0);
        if (!selectedFile) return;
        showPreview(selectedFile);
      },
      [showPreview]
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
      <UploadImagePreviewerContainer>
        {previewImage && (
          <PreviewContainer
            {...PreviewImageAnimation}
            src={previewImage}
            alt={"Preview select image"}
            onError={() => setPreviewImage("")}
          />
        )}
        <UploadImageInput $hasPreview={!!previewImage}>
          <UploadImageNotificationContainer>
            <UploadImageNotificationText
              variants={PreviewAnimation.variants}
              animate={!!previewImage ? "hidden" : "visible"}
            >
              Drag & drop photos here or <strong>Browse</strong>
            </UploadImageNotificationText>
            <IconBox transition={PreviewAddButtonAnimation.transition} layout>
              <TbPhotoPlus size={"4rem"} />
            </IconBox>
          </UploadImageNotificationContainer>

          <input ref={inputRef} type='file' accept='image/*' id='upload' />
        </UploadImageInput>
      </UploadImagePreviewerContainer>
    );
  }
);

export default memo(UploadImagePreview);
