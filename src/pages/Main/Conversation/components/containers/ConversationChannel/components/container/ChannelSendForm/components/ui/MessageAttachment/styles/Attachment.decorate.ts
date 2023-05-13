import { motion } from "framer-motion";
import styled from "styled-components";

export const AttachmentItemsContainer = styled(motion.div)`
  display: block;
  box-sizing: border-box;
  overflow-y: hidden;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export const AttachmentItemsScrollWarper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  height: 100%;
`;

export const AttachmentItemWrapper = styled(motion.div)`
  flex: 0 0 auto;
`;
