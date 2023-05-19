import useAttachment from "@pages/Main/Conversation/components/containers/ConversationChannel/hooks/useAttachments";
import { AnimatePresence } from "framer-motion";
import { memo } from "react";
import { AnimationItem } from "../../animation/AttachmentItem.animate";
import {
  AttachmentItemsScrollWarper,
  AttachmentItemWrapper,
} from "../../styles/Attachment.decorate";
import AttachmentItem from "../ui/AttachmentItem";
import AttachmentHint from "../ui/AttachmentItem/components/AttachmentHint";

const AttachmentScrollView = () => {
  const { files } = useAttachment();

  return (
    <AttachmentItemsScrollWarper>
      <AnimatePresence mode='popLayout'>
        {files.map(([id, file], index) => {
          return (
            <AttachmentItemWrapper
              layout
              custom={index}
              {...AnimationItem}
              key={id}
              id={id}
            >
              <AttachmentItem id={id} file={file} />
              <AttachmentHint
                selector={`#${id}`}
                fileName={file.name}
                fileType={file.type}
                fileSize={file.size}
              />
            </AttachmentItemWrapper>
          );
        })}
      </AnimatePresence>
    </AttachmentItemsScrollWarper>
  );
};

export default memo(AttachmentScrollView);
