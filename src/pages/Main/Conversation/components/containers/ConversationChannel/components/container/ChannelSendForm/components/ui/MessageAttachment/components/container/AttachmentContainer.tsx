import { AnimatePresence } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { AnimationContainer } from "../../animation/AttachmentContainer.animate";
import useAttachment from "../../hooks/useAttachment";
import { AttachmentItemsContainer } from "../../styles/Attachment.decorate";
import AttachmentClear from "../ui/AttachmentClear";
import AttachmentScrollView from "./AttachmentScrollView";

const AttachmentContainer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { files } = useAttachment();

  useEffect(() => {
    setOpen(files.length !== 0);
  }, [files]);

  return (
    <AnimatePresence mode='wait'>
      {/* Exit animation */}
      {open && (
        <AttachmentItemsContainer layoutScroll {...AnimationContainer}>
          {/* Exit without animation */}
          {open && <AttachmentScrollView />}
          <AttachmentClear />
        </AttachmentItemsContainer>
      )}
    </AnimatePresence>
  );
};

export default memo(AttachmentContainer);
