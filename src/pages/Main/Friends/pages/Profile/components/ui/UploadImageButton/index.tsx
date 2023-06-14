import { convertBlobToBase64 } from "@components/Image/CacheImage/utils/ImageUtils";
import { useModals } from "@components/Modal/hooks/useModals";
import useAppDispatch from "@hooks/useAppDispatch";
import { updateImage } from "@store/slices/profiles";
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
  const dispatch = useAppDispatch();
  const modal = useModals();

  const _handleOnUpLoadImage = async (image?: File) => {
    const file = image && (await convertBlobToBase64(image));
    dispatch(updateImage({ file: file as string, type: type }));

    /**
     * Callback on loaded Success
     */
    if (!onUploadSuccess) return;
    if (!image) onUploadSuccess("");
    else {
      if (!onUploadSuccess) return;
      const urlBlob = URL.createObjectURL(image);
      onUploadSuccess(urlBlob);
    }
  };

  const handleUploadImage = () => {
    modal.show(
      <UploadImageModal
        onUploadImageSuccess={_handleOnUpLoadImage}
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
