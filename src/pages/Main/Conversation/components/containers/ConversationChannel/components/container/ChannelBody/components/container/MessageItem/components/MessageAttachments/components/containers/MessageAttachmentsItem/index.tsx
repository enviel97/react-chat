import { FC, memo } from "react";
import { AttachmentsItem } from "../../../styles/MessageAttachments.decorate";

import ImageAttachments from "./components/ImageAttachments";

const MessageAttachmentItem: FC<MessageAttachmentItemProp> = ({
  attachment,
  onItemClick,
}) => {
  return (
    <AttachmentsItem onClick={onItemClick}>
      {attachment.is("IMAGES") && (
        <ImageAttachments
          publicId={attachment.publicId}
          type={attachment.type}
          size={attachment.size}
          originalName={attachment.originName}
          createdAt={attachment.createdAt}
        />
      )}
    </AttachmentsItem>
  );
};

export default memo(MessageAttachmentItem);
