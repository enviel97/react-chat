import { useContext } from "react";
import { AttachmentContext } from "../reducer/attachment.provider";

const useAttachment = () => {
  const { state, removeAttachment, addAttachments, clearAttachment } =
    useContext(AttachmentContext);

  return {
    files: state,
    removeAttachment,
    addAttachments,
    clearAttachment,
  };
};

export default useAttachment;
