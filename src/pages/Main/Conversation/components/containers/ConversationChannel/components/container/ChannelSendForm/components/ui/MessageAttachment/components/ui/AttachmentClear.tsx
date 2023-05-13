import useCount from "@components/Animation/hooks/useCount";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { IoFileTrayFull } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";
import useAttachment from "../../hooks/useAttachment";

const AttachmentClearIcon = styled.span`
  font-size: 2rem;
`;

const AttachmentClearButton = styled(motion.div)`
  position: absolute;
  width: fit-content;
  height: fit-content;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 0.5rem;
  font-weight: bold;
  padding: 0.25rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.surfaceColor};
`;

const SizeBadge = styled(motion.span)`
  position: absolute;
  height: 1.3em;
  width: fit-content;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 40%);
  font-size: 0.8em;
  padding: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.onNotificationColor};
  background-color: red;
  border-radius: 0.3em;
`;

const AttachmentClear = () => {
  const { files, clearAttachment } = useAttachment();
  const { count } = useCount({ quantity: files.length });

  return (
    <AnimatePresence mode='wait'>
      <AttachmentClearButton
        id='f-count'
        variants={{
          hover: { scale: 1.1 },
          active: { scale: 0.98 },
        }}
        whileHover='hover'
        whileTap='active'
        onClick={clearAttachment}
      >
        <AttachmentClearIcon>
          <IoFileTrayFull />
        </AttachmentClearIcon>
        <SizeBadge>{count}</SizeBadge>
      </AttachmentClearButton>
      <Tooltip anchorSelect='#f-count' content='Click to remove all' />
    </AnimatePresence>
  );
};

export default memo(AttachmentClear);
