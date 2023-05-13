import { motion } from "framer-motion";
import styled from "styled-components";

export const AttachmentItemContainer = styled(motion.div)`
  position: relative;
  background-color: ${({ theme }) => theme.backgroundColor};
  display: block;

  height: 150px;
  width: fit-content;
  padding: 1rem;
`;

export const AttachmentItemPreview = styled.div`
  display: block;
  box-sizing: border-box;
  min-width: 100px;
  width: 100%;
  height: 100%;
`;

export const AttachmentItemRemove = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.disableColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.surfaceColor};
  &:hover {
    color: ${({ theme }) => theme.notificationColor};
    scale: 1.1;
  }
  &:active {
    scale: 0.98;
  }
`;
