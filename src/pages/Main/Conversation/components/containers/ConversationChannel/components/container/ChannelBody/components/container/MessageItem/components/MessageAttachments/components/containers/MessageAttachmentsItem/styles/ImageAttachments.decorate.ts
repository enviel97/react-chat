import { shaddow } from "@theme/helper/styles";
import { motion, MotionProps } from "framer-motion";
import styled, { css } from "styled-components";
import AttachmentsImage from "../../../ui/AttachmentsImage";

const Content = styled(AttachmentsImage)`
  position: relative;
  border-radius: inherit;
  cursor: zoom-in;
  transition: 250ms transform ease-out, 250ms scale ease-out;
`;

const Container = styled(motion.div)`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0.75em;
  border-radius: inherit;

  ${({ theme }) => {
    const color = theme.backgroundColor;
    return css`
      box-shadow: ${shaddow.boxShadow(
        { options: "inset", x: -0.2, y: -0.2, blur: 0.5, color },
        { options: "inset", x: 0.2, y: 0.2, blur: 0.5, color }
      )};
    `;
  }}

  & ${Content} {
    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border-radius: inherit;
      border: none;
      outline: none;

      ${({ theme }) => {
        const color = theme.backgroundColor;
        return css`
          box-shadow: ${shaddow.boxShadow(
            { x: -0.2, y: -0.2, blur: 0.5, brightness: 10, color },
            { x: 0.2, y: 0.2, blur: 0.5, color }
          )};
        `;
      }}
    }

    &:hover {
      transform: translateY(-3%);
      scale: 1.1;
      &::after {
        ${({ theme }) => {
          const color = theme.backgroundColor;
          return css`
            box-shadow: ${shaddow.boxShadow(
              { x: -0.2, y: -0.2, blur: 0.5, brightness: 10, color },
              { x: 0.2, y: 0.2, blur: 1, color }
            )};
          `;
        }}
      }
    }
  }
`;

const Animation: MotionProps = Object.freeze({});

// eslint-disable-next-line
export default {
  Container,
  Content,
  Animation,
};
