import { colorBrightness } from "@theme/helper/tools";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import styled from "styled-components";
export const HintContainer = styled.div`
  position: absolute;
  height: 1em;
  aspect-ratio: 1;
  right: -0.25em;
  bottom: -0.25em;
`;

export const PromiseLoadingContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.backgroundColor};
  border: 0.15em solid ${({ theme }) => theme.disableColor};
  border-radius: 50%;
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.backgroundColor};
`;

export const KTooltip = styled(Tooltip)`
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) =>
    colorBrightness(props.theme.backgroundColor, 20)};
`;
