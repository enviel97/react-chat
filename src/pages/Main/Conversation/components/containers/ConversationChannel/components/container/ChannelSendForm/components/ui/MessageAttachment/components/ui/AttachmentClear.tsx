import useCount from "@components/Animation/hooks/useCount";
import useAttachment from "@pages/Main/Conversation/components/containers/ConversationChannel/hooks/useAttachments";

import { motion } from "framer-motion";
import { Fragment, memo } from "react";
import { IoFileTrayFull } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";

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
  const { files, clear } = useAttachment();
  const { count } = useCount({ quantity: files.length, duration: 0.2 });

  return (
    <Fragment>
      <AttachmentClearButton
        id='f-count'
        variants={{
          hidden: { opacity: 0, transition: { duration: 0.2 } },
          hover: { scale: 1.1 },
          active: { scale: 0.98 },
        }}
        exit='hidden'
        whileHover='hover'
        whileTap='active'
        onClick={clear}
      >
        <AttachmentClearIcon>
          <IoFileTrayFull />
        </AttachmentClearIcon>
        <SizeBadge>{count}</SizeBadge>
      </AttachmentClearButton>
      <Tooltip anchorSelect='#f-count' content='Click to remove all' />
    </Fragment>
  );
};

export default memo(AttachmentClear);
