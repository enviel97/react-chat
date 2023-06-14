import { AnimatePresence, motion } from "framer-motion";
import { FC, memo, useState } from "react";
import Styles from "../styles/ImageAttachments.decorate";
import AttachmentsHint from "./AttachmentsHint";

const ImageAttachments: FC<ImageAttachmentsProp> = ({
  publicId,
  type,
  size,
  originalName,
  createdAt,
}) => {
  const [isHover, setHover] = useState<boolean>(false);

  return (
    <Styles.Container id={`${publicId}_info`} {...Styles.Animation}>
      <motion.div
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        style={{ height: "100%", width: "100%", borderRadius: "inherit" }}
      >
        <Styles.Content publicId={publicId} viewport={"sm"} />
      </motion.div>

      <AnimatePresence>
        {isHover && (
          <AttachmentsHint
            type={type}
            size={size}
            originalName={originalName}
            createdAt={createdAt}
          />
        )}
      </AnimatePresence>
    </Styles.Container>
  );
};

export default memo(ImageAttachments);
