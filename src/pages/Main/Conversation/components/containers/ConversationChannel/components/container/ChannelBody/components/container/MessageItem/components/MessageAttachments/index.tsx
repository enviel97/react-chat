import { FC, memo } from "react";
import MessageAttachmentsItem from "./components/containers/MessageAttachmentsItem";
import useAttachmentSlide from "./hooks/useMessageAttachments";
import { AttachmentsContainer } from "./styles/MessageAttachments.decorate";

const MessageAttachments: FC<MessageAttachmentsProps> = ({ attachments }) => {
  const { openSlide } = useAttachmentSlide();

  return (
    <AttachmentsContainer>
      {attachments.map((attachment, index) => {
        return (
          <MessageAttachmentsItem
            key={attachment.getId()}
            attachment={attachment}
            onItemClick={function () {
              openSlide({ attachments, defaultIndex: index });
            }}
          />
        );
      })}
    </AttachmentsContainer>
  );
};

export default memo(MessageAttachments);
