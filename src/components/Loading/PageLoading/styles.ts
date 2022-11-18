import {
  colorBrightness,
  neumorphismBoxShadow,
  neumorphismBoxShadowInset,
} from "@common/helper/tools";
import { Variants } from "framer-motion";
import styled from "styled-components";

export const LoaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const Loader = styled.span`
  position: relative;
  width: 50vh;
  height: 50vh;
  border-radius: 50%;
  border: 15px solid #121212;
  box-shadow: ${neumorphismBoxShadow(true)};
  overflow: hidden;

  & i {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(
      ${({ theme }) => colorBrightness(theme.onBackgroundColor, 10)},
      ${({ theme }) => colorBrightness(theme.secondaryColor, 10)},
      ${({ theme }) => colorBrightness(theme.tertiaryColor, 10)}
    );
    filter: blur(10px);
    box-shadow: ${neumorphismBoxShadowInset(true)};
  }

  &::before {
    content: "LOADING";
    font-size: 2.125rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 8vh;
    border-radius: 50%;
    background-color: #121212;
    box-shadow: ${neumorphismBoxShadowInset(true)},
      ${neumorphismBoxShadow(true)};
    z-index: 1;
  }
`;

export const rotate: Variants = {
  initial: { rotate: 0 },
  animate: { rotate: 360 },
};
