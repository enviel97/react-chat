import { AnimatePresence } from "framer-motion";
import { FC, memo, useEffect, useMemo, useState } from "react";
import { TiDelete } from "react-icons/ti";
import useAttachment from "../../../hooks/useAttachment";
import AttachmentIcon from "./components/AttachmentIcon";
import AttachmentImage from "./components/AttachmentImage";
import {
  AttachmentItemContainer,
  AttachmentItemPreview,
  AttachmentItemRemove,
} from "./styles/AttachmentItem.decorate";

interface AttachmentItemProps {
  fileId: string;
  file: File;
}

const AttachmentItem: FC<AttachmentItemProps> = ({ file, fileId }) => {
  const [imageSrc, setImageSrc] = useState<string>();
  const { removeAttachment } = useAttachment();

  const isImage = useMemo(() => file?.type.includes("image"), [file]);

  useEffect(() => {
    let blob = "";
    if (!file) return;
    if (file.type.includes("image")) {
      blob = URL.createObjectURL(file);
      setImageSrc(blob);
    }
    return () => {
      blob && URL.revokeObjectURL(blob);
    };
  }, [file]);

  const handleOnRemoveItem = () => {
    removeAttachment(fileId);
  };

  return (
    <AttachmentItemContainer>
      <AttachmentItemPreview>
        {isImage && <AttachmentImage imageSrc={imageSrc} />}
        {!isImage && <AttachmentIcon name={file.name} />}
      </AttachmentItemPreview>
      <AttachmentItemRemove onClick={handleOnRemoveItem}>
        <TiDelete size={"1.5rem"} />
      </AttachmentItemRemove>
    </AttachmentItemContainer>
  );
};

export default memo(AttachmentItem);
