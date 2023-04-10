import { motion } from "framer-motion";
import styled from "styled-components";

export const DropdownActionValueContainer = styled.div`
  display: flex;
  padding: 0 0.5rem;
  align-items: center;
  justify-content: flex-start;
`;

export const ItemBox = styled.div`
  width: 100%;
  margin-right: 0.25rem;
  border-right: 2px solid ${({ theme }) => theme.surfaceColor};
`;

export const IconBox = styled(motion.div)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  font-size: 1.25rem;
  padding: 0rem 0.5rem;
`;
