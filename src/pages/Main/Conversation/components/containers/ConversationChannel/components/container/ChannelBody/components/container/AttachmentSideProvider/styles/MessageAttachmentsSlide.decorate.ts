import { shaddow } from "@theme/helper/styles";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Swiper } from "swiper/react";

const Container = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundColor};
  box-sizing: border-box;
`;

const SlideItem = styled(motion.div)`
  display: block;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;

const MiniPreviewContainer = styled(Swiper)`
  position: relative;
  width: 100%;
  height: 20%;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 0.5rem;
  border-top: 5px solid ${({ theme }) => theme.surfaceColor};
  box-shadow: ${({ theme }) =>
    shaddow.boxShadow({
      color: theme.surfaceColor,
      x: 0,
      y: -1,
      spread: -0.75,
    })};

  & .swiper-slide {
    width: fit-content;
    height: 100%;
    opacity: 0.2;
    filter: grayscale(1);
    transition: 0.25s opacity ease-in, 0.25s filter ease-in;

    &-thumb-active,
    &:hover {
      border: none;
      filter: grayscale(0);
      opacity: 1;
    }
  }
`;

const PreviewContainer = styled(Swiper)`
  position: relative;
  flex: 1;
  padding: 0.5rem;
  width: 100%;
`;

// eslint-disable-next-line
export default {
  Container,
  Preview: {
    Full: PreviewContainer,
    Mini: MiniPreviewContainer,
    Item: SlideItem,
  },
};
