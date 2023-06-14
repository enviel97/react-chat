import { motion } from "framer-motion";
import styled from "styled-components";

export const AttachmentsContainer = styled.div`
  position: relative;
  border-radius: inherit;
  padding: 0.5em;
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: flex-start;
`;

export const AttachmentsItem = styled(motion.div)`
  position: relative;
  width: 12.5em;
  aspect-ratio: 3/4;
  border-radius: inherit;
  margin: 0.15em;
`;
