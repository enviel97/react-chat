import useAttachment from "@pages/Main/Conversation/components/containers/ConversationChannel/hooks/useAttachments";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { TiDelete } from "react-icons/ti";
import AttachmentIcon from "./components/AttachmentIcon";
import AttachmentImage from "./components/AttachmentImage";
import {
  AttachmentItemContainer,
  AttachmentItemPreview,
  AttachmentItemRemove,
} from "./styles/AttachmentItem.decorate";

interface AttachmentItemProps {
  id: string;
  file: File;
}

const AttachmentItem: FC<AttachmentItemProps> = ({ id, file }) => {
  const { remove } = useAttachment();
  const [blob, setBlob] = useState<string>();

  const isImage = useMemo(() => file?.type.includes("image"), [file]);

  useEffect(() => {
    if (!isImage) return;
    const blobUrl = URL.createObjectURL(file);
    setBlob(blobUrl);
    return () => {
      URL.revokeObjectURL(blobUrl);
    };
  }, [file, isImage]);

  const handleOnRemoveItem = () => {
    remove(id);
  };

  return (
    <AttachmentItemContainer>
      <AttachmentItemPreview>
        {isImage && <AttachmentImage imageSrc={blob} />}
        {!isImage && <AttachmentIcon name={file.name} />}
      </AttachmentItemPreview>
      <AttachmentItemRemove onClick={handleOnRemoveItem}>
        <TiDelete size={"1.5rem"} />
      </AttachmentItemRemove>
    </AttachmentItemContainer>
  );
};

export default memo(AttachmentItem);
