import { useModals } from "@components/Modal/hooks/useModals";
import { safeLog } from "@core/api/utils/logger";
import useAppDispatch from "@hooks/useAppDispatch";
import useSocket from "@hooks/useSocket";
import { uploadImage } from "@store/repo/user/apis/profile/updateProfile";
import { FC, useCallback, useEffect, useState } from "react";
import UploadImagePreview from "../components/container/UploadImagePreview";
import ButtonIconText from "../components/ui/ButtonIconText";
import {
  UploadImageAction,
  UploadImageModalContainer,
} from "../styles/UploadImageModal.decorate";
import UploadInfo from "./component/UploadInfo";
import UploadPercentage from "./component/UploadPercentage";
import { getImageAspectRatio } from "./utils/getImageAspectRatio";

interface Props {
  initialSrc?: string;
  type: "avatar" | "banner";
  onUploadImageSuccess?: (file?: File) => void;
  onUploadImageError?: (error?: any) => void;
}
const MODAL_ID = "UploadImageModalId";

const UploadImageModal: FC<Props> = ({
  initialSrc,
  type,
  onUploadImageError,
  onUploadImageSuccess,
}) => {
  const modal = useModals();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState<boolean>();
  const [file, setFile] = useState<File>();
  const [percentage, setPercentage] = useState<number>();

  const isDisableAction = isLoading || !file;

  const socket = useSocket();

  const onSelectedImage = useCallback((image?: File) => {
    setFile(image);
  }, []);

  const resetUploadImage = useCallback(() => {
    setPercentage(undefined);
    setLoading(false);
  }, []);

  useEffect(() => {
    socket.on("IMAGE_UPLOAD_ERROR", (payload) => {
      setError(true);
      resetUploadImage();
    });

    return () => {
      socket.off("IMAGE_UPLOAD_ERROR");
    };
  }, [socket, resetUploadImage]);

  const handleUploadImage = async () => {
    if (!file) return;
    setLoading(true);
    setError(undefined);
    try {
      await uploadImage({ file: file, pathVariable: type }, (processEvent) => {
        const { loaded, total = 1 } = processEvent;
        let uploadPercentage = Math.floor(loaded * 100) / total;
        if (uploadPercentage <= 100) setPercentage(uploadPercentage);
      });
      setTimeout(() => {
        modal.close(MODAL_ID);
        onUploadImageSuccess && onUploadImageSuccess(file);
        resetUploadImage();
      }, 1200);
    } catch (error) {
      setError(true);
      resetUploadImage();
      onUploadImageError && onUploadImageError();
      safeLog(error);
    }
  };

  return (
    <UploadImageModalContainer>
      <h3>Upload Image</h3>
      <UploadImagePreview
        initialSrc={initialSrc}
        aspectRatio={getImageAspectRatio(type)}
        onSelectImage={onSelectedImage}
      >
        <UploadPercentage percentage={percentage} isError={isError} />
      </UploadImagePreview>
      <UploadInfo file={file} />
      <UploadImageAction>
        <ButtonIconText
          text={"upload"}
          disable={isDisableAction}
          onClick={handleUploadImage}
        />
      </UploadImageAction>
    </UploadImageModalContainer>
  );
};

export const ModalOption: ModalOptions = {
  modalId: MODAL_ID,
  height: "fit-content",
  width: "fit-content",
};

export default UploadImageModal;
