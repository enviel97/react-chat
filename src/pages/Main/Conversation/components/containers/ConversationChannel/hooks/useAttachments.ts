import { useContext } from "react";
import { AttachmentContext } from "../context/AttachmentProvider";

const useAttachment = () => {
  const attachmentMethod = useContext(AttachmentContext);
  return attachmentMethod;
};

export default useAttachment;
