import { useModals } from "@components/Modal/hooks/useModals";
import { safeLog } from "@core/api/utils/logger";
import useSocket from "@hooks/useSocket";
import { uploadImage } from "@store/repo/user";
import type { AxiosProgressEvent } from "axios";
import { AnimatePresence } from "framer-motion";
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
  const [state, setState] = useState<ProgressState>("idle");
  const [file, setFile] = useState<File>();
  const [percentage, setPercentage] = useState<number>();
  const isDisableAction = state !== "idle" || !file;

  const socket = useSocket();

  const onSelectedImage = useCallback((image?: File) => {
    setFile(image);
  }, []);

  const resetUploadImage = useCallback(
    (type: ProgressState, percentage?: number) => {
      setPercentage(percentage);
      setState(type);
    },
    []
  );

  const handleError = useCallback(
    (error: any) => {
      setState("error");
      setTimeout(() => {
        onUploadImageError && onUploadImageError();
        resetUploadImage("idle");
      }, 500);
      safeLog({ error });
    },
    [resetUploadImage, onUploadImageError]
  );

  useEffect(() => {
    socket.on("IMAGE_UPLOAD_ERROR", handleError);
    return () => {
      socket.off("IMAGE_UPLOAD_ERROR");
    };
  }, [socket, handleError]);

  const onUploadProgress = useCallback(
    (processEvent: AxiosProgressEvent) => {
      const { loaded, total = 1 } = processEvent;
      let uploadPercentage = Math.floor(loaded * 100) / total;
      if (uploadPercentage <= 100) {
        resetUploadImage("pending", uploadPercentage);
      }
    },
    [resetUploadImage]
  );

  const onDownloadProgress = useCallback(() => {
    resetUploadImage("success", 100);
  }, [resetUploadImage]);

  const handleUploadImage = () => {
    if (!file) return;
    resetUploadImage("pending", 0);
    uploadImage(
      { file: file, pathVariable: type },
      onUploadProgress,
      onDownloadProgress
    )
      .then(() => {
        setTimeout(() => {
          modal.close(MODAL_ID);
          onUploadImageSuccess && onUploadImageSuccess(file);
        }, 2000);
      })
      .catch(handleError);
  };

  return (
    <UploadImageModalContainer>
      <h3>Upload Image</h3>
      <UploadImagePreview
        initialSrc={initialSrc}
        aspectRatio={getImageAspectRatio(type)}
        onSelectImage={onSelectedImage}
      >
        <AnimatePresence>
          {state !== "idle" && (
            <UploadPercentage percentage={percentage} type={state} />
          )}
        </AnimatePresence>
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
  isDialog: true,
  isDisableExitClose: true,
};

export default UploadImageModal;
