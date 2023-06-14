import { shaddow } from "@theme/helper/styles";
import { motion } from "framer-motion";
import { FC } from "react";
import styled, { css } from "styled-components";
import MessageAttachmentsSlide from "../container/MessageAttachmentsSlide";
import Styles from "../../styles/AttachmentSide.decorate";

interface ModalContainerProps extends Components {
  attachments: MessageAttachments[];
  defaultIndex?: number;
}

const Container = styled(motion.div)`
  position: relative;
  display: block;
  height: clamp(20svh, 800px + 1vh, 90svh);
  width: 75svw;
  box-sizing: border-box;
  ${({ theme }) => {
    const mainColor = theme.backgroundColor;
    const boxShadow = shaddow.boxShadow(
      {
        x: 0.5,
        y: 0.5,
        blur: 1,
        color: mainColor,
        brightness: -10,
      },
      {
        x: -0.5,
        y: -0.5,
        color: mainColor,
        blur: 1.5,
        brightness: 2,
      }
    );
    return css`
      border: 1px solid ${theme.surfaceColor}80;
      box-shadow: ${boxShadow};
    `;
  }};
`;

const ModalContainer: FC<ModalContainerProps> = ({
  attachments,
  defaultIndex = 0,
  children,
}) => {
  return (
    <Container
      {...Styles.Animation.container}
      aria-modal='true'
      tabIndex={0}
      role={"dialog"}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
      <MessageAttachmentsSlide
        attachments={attachments}
        defaultSelect={defaultIndex}
      />
    </Container>
  );
};

export default ModalContainer;
