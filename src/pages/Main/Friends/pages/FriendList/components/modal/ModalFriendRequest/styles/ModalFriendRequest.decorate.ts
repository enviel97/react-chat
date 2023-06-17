import { motion } from "framer-motion";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

export const ModalFriendRequestContainer = styled.div`
  position: relative;
  display: flex;
  background-color: transparent;
  padding: 2rem;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const ModalFriendRequestHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 4rem;
  margin-right: 2rem;

  & > h4 {
    font-weight: bold;
  }
  & > span {
    position: absolute;
    color: var(--disable-color);
    bottom: -2.7rem;
    left: 2rem;
  }
`;

export const ModalFriendRequestBody = styled(motion.div)`
  position: relative;
  font-weight: 250;
  color: var(--disable-color);
  text-align: center;
  height: 100%;
  width: 100%;
`;

export const ModalFriendRequestItem = styled(SwiperSlide)`
  display: block;
  box-sizing: border-box;
`;

export const ModalFriendRequestItemAnimate = styled(motion.div)`
  display: block;
  width: 100%;
  height: 100%;
`;

export const ModalFriendRequestList = styled(Swiper)`
  display: block;
  box-sizing: border-box;

  height: 100%;
  width: 100%;
`;
