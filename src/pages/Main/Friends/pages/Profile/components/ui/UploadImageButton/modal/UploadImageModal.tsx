import { useModals } from "@components/Modal/hooks/useModals";
import { FC, useRef } from "react";
import UploadImagePreview, {
  UploadImagePreviewController,
} from "../components/container/UploadImagePreview";
import ButtonIconText from "../components/ui/ButtonIconText";
import {
  UploadImageAction,
  UploadImageModalContainer,
} from "../styles/UploadImageModal.decorate";

interface Props {
  initialSrc?: string;
  onSelectedImage?: (file?: File) => void;
}
const MODAL_ID = "UploadImageModalId";

const UploadImageModal: FC<Props> = ({ initialSrc, onSelectedImage }) => {
  const modal = useModals();
  const ref = useRef<UploadImagePreviewController>(null);

  return (
    <UploadImageModalContainer>
      <h3>Upload Image</h3>
      <UploadImagePreview ref={ref} initialSrc={initialSrc} />
      <UploadImageAction>
        <ButtonIconText
          text={"clear"}
          onClick={function (): void {
            ref.current?.clearImage();
          }}
        />
        <ButtonIconText
          text={"upload"}
          onClick={function (): void {
            const file = ref.current?.getImage();
            onSelectedImage && onSelectedImage(file);
            modal.close(MODAL_ID);
          }}
        />
      </UploadImageAction>
    </UploadImageModalContainer>
  );
};

export const ModalOption: ModalOptions = {
  modalId: MODAL_ID,
  height: "fit-content",
};

export default UploadImageModal;
