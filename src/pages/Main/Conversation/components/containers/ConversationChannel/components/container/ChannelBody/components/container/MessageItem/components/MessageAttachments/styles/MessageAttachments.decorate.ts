import { breakpoint } from "@theme/helper/breakpoint";
import { clampSize } from "@theme/helper/tools";
import { motion } from "framer-motion";
import styled from "styled-components";

export const AttachmentsContainer = styled.div`
  position: relative;
  border-radius: inherit;
  padding: 0.5em;
  display: grid;
  align-items: flex-start;

  grid-template-columns: repeat(3, auto);

  ${breakpoint.down("laptop")} {
    grid-template-columns: repeat(2, auto);
  }
  ${breakpoint.down("mobile")} {
    grid-template-columns: repeat(1, auto);
  }
`;

export const AttachmentsItem = styled(motion.div)`
  position: relative;
  width: ${clampSize({
    minWidth: 375,
    maxWidth: 630,
    maxFontSize: 12.5,
    minFontSize: 8,
  })};
  aspect-ratio: 3/4;
  border-radius: inherit;
  margin: 0.15em;

  ${breakpoint.down("mobile")} {
    width: 100%;
  }
`;
