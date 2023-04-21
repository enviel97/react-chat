import { motion } from "framer-motion";
import { colorBrightness } from "@theme/helper/tools";
import styled, { css } from "styled-components";
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
  backdrop-filter: blur(10px);

  color: ${({ theme, $isError, $isSuccess }) => {
    if (!!$isError) return theme.errorColor;
    if (!!$isSuccess) return theme.successColor;
    return theme.primaryColor;
  }};
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
  & > p {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const UploadProgressBarCircle = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  filter: drop-shadow(0 0 1px currentColor) drop-shadow(0 0 2px currentColor)
    drop-shadow(0 0 3px currentColor) drop-shadow(0 0 4px currentColor)
    drop-shadow(0 0 5px currentColor);

  & > span {
    margin: 1rem;
    border-radius: 50%;
    font-size: 8rem;
    ${({ theme }) => {
      const mainColor = theme.surfaceColor;
      return css`
        border: 4px solid ${theme.backgroundColor};
        background: linear-gradient(145deg, #1e1e1e, #232323);
        box-shadow: inset 0.4rem 0.4rem 1.2rem
            ${colorBrightness(mainColor, -10)},
          inset 0.4rem 0.4rem 1.3rem ${colorBrightness(mainColor, -20)},
          inset 0.4rem 0.4rem 1.4rem ${colorBrightness(mainColor, -30)},
          inset -0.4px -0.4px 1.2rem ${colorBrightness(mainColor, 10)},
          inset -0.4px -0.4px 1.3rem ${colorBrightness(mainColor, 20)},
          inset -0.4px -0.4px 1.4rem ${colorBrightness(mainColor, 30)};
      `;
    }}

    & > svg {
      opacity: 1;
      padding: 1.5rem;
    }
  }
`;
