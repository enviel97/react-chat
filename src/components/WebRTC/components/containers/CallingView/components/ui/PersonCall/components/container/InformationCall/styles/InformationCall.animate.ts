import { motion } from "framer-motion";
import styled from "styled-components";

export const PersonConnectionWave = styled(motion.div)`
  position: absolute;
  height: 100%;
  aspect-ratio: 1/1;
  top: 0;
  left: auto;
  right: auto;
  border-radius: 50%;
  border-style: solid;
  border-color: #303030;
`;

export const PersonCallName = styled(motion.span)`
  position: absolute;
  top: 110%;
  font-weight: bold;
  white-space: nowrap;
  font-size: 16px;
  padding: 0.2rem 1rem;
`;

export const PersonCallAvatarContainer = styled.div`
  display: block;
  box-sizing: border-box;
  height: fit-content;
  width: fit-content;
`;

export const PersonCallInfoContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 500px;
`;
