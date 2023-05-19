import useAttachment from "@pages/Main/Conversation/components/containers/ConversationChannel/hooks/useAttachments";
import { AnimatePresence } from "framer-motion";
import { memo, useMemo } from "react";
import { AnimationContainer } from "../../animation/AttachmentContainer.animate";
import { AttachmentItemsContainer } from "../../styles/Attachment.decorate";
import AttachmentClear from "../ui/AttachmentClear";
import AttachmentScrollView from "./AttachmentScrollView";

const AttachmentContainer = () => {
  const { quantity } = useAttachment();

  const isEmpty = useMemo(() => {
    return quantity === 0;
  }, [quantity]);

  return (
    <AnimatePresence mode='wait'>
      {/* Exit animation */}
      {!isEmpty && (
        <AttachmentItemsContainer layoutScroll {...AnimationContainer}>
          <AttachmentScrollView />
          <AttachmentClear />
        </AttachmentItemsContainer>
      )}
    </AnimatePresence>
  );
};

export default memo(AttachmentContainer);
