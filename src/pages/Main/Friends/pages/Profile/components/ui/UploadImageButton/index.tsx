import { useModals } from "@components/Modal/hooks/useModals";
import { FC, memo } from "react";
import { TbPhotoUp } from "react-icons/tb";
import UploadImageModal, { ModalOption } from "./modal/UploadImageModal";
import { ButtonContainer } from "./styles/UploadImageButton.decorate";

const UploadImageButton: FC<UploadImageButtonProps> = ({
  onSelectImage,
  separateSpace,
  size = "2rem",
}) => {
  const modal = useModals();

  const handleUploadImage = () => {
    modal.show(
      <UploadImageModal
        onSelectedImage={(image) => {
          if (!image || !onSelectImage) return;
          onSelectImage && onSelectImage(image);
        }}
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
