import { useModals } from "@components/Modal/hooks/useModals";
import { FC, memo } from "react";
import { TbPhotoUp } from "react-icons/tb";
import UploadImageModal, { ModalOption } from "./modal/UploadImageModal";
import { ButtonContainer } from "./styles/UploadImageButton.decorate";

const UploadImageButton: FC<UploadImageButtonProps> = ({
  onUploadSuccess,
  onUploadError,
  separateSpace,
  size = "2rem",
  type = "avatar",
}) => {
  const modal = useModals();

  const handleUploadImage = () => {
    modal.show(
      <UploadImageModal
        onUploadImageSuccess={(image) => {
          if (!onUploadSuccess) return;
          if (!image) onUploadSuccess("");
          else {
            const urlBlob = URL.createObjectURL(image);
            onUploadSuccess(urlBlob);
          }
        }}
        onUploadImageError={onUploadError}
        type={type}
      />,
      ModalOption
    );
  };

  return (
    <ButtonContainer
      $separateSpace={separateSpace}
      whileHover={{ scale: 1.2, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleUploadImage}
    >
      <TbPhotoUp size={size} />
    </ButtonContainer>
  );
};

export default memo(UploadImageButton);
