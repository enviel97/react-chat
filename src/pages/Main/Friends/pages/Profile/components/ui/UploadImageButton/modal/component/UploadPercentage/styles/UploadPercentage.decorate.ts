import { motion } from "framer-motion";
import styled from "styled-components";
interface Props {
  $isError?: boolean;
  $isSuccess?: boolean;
}

export const UploadPercentageContainer = styled(motion.div)<Props>`
  position: absolute;
  top: 0;
  left: 0;

  display: inline-block;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.backgroundColor}af;
  font-size: 2rem;
  z-index: 1000;
`;

export const UploadProgressBarContainer = styled(motion.div)`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const UploadProgressBarText = styled.div`
  position: absolute;
  bottom: 2rem;
  left: auto;
  right: auto;
  display: flex;
  flex-direction: row;
  & > span {
    font-size: 1.5rem;
    font-weight: bold;
    display: flex;
    gap: 0.5ch;
    filter: none;
    gap: 1ch;
  }
`;

export const UploadProgressBarCircle = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;
