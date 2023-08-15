import { LocalPersonCallContainerShadow } from "@components/WebRTC/utils/shaddow";
import { motion } from "framer-motion";
import styled from "styled-components";

const LocalPersonCall = Object.freeze({
  Container: styled(motion.div)`
    position: absolute;
    display: flex;
    flex-direction: row;
    right: 0;
    bottom: 2em;
    height: 15em;
    aspect-ratio: 320/240;
    background-color: var(--surface-color);
    z-index: 10;
    box-shadow: ${LocalPersonCallContainerShadow};
    display: flex;
  `,
  LiveContainer: styled.div`
    display: block;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  `,
  ActionContainer: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-100%, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    background-color: var(--background-color);
    height: 100%;
    width: 5rem;
    box-shadow: ${LocalPersonCallContainerShadow};
    padding: 1em 0;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  `,
  ActionStreamContainer: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    gap: 0.5em;
    justify-content: flex-end;
  `,
});

export default LocalPersonCall;
