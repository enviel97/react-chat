import { useContext } from "react";
import { AttachmentSlideContext } from "../../../../AttachmentSideProvider";

const useAttachmentSlide = () => {
  const AttachmentSlide = useContext(AttachmentSlideContext);
  return AttachmentSlide;
};

export default useAttachmentSlide;
