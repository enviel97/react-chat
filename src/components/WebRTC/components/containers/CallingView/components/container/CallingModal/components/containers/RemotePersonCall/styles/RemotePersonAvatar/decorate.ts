import { motion } from "framer-motion";
import styled, { css } from "styled-components";

const RemotePersonAvatar = Object.freeze({
  Container: styled(motion.div)<RemotePersonAvatarContainer>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    padding: 1em;
    display: flex;
    ${({ $animate, theme }) => {
      if ($animate === "webcam_on") {
        return css`
          align-items: flex-start;
          justify-content: flex-start;
          background-color: transparent;
        `;
      }

      return css`
        align-items: center;
        justify-content: center;
        background-color: var(--surface-color);
      `;
    }}
  `,
  Waiting: styled(motion.div)`
    position: absolute;
    height: 100%;
    width: 100%;

    border: 0.25em solid #ffffff21;
    border-radius: 50%;
    scale: 1.25;
  `,
  Avatar: styled(motion.div)<RemotePersonAvatarContainer>`
    position: relative;
    border: 0.25em solid #12121214;
    border-radius: 50%;
    ${({ $animate }) => {
      if ($animate === "webcam_on") {
        return css`
          width: 3.5em;
          height: 3.5em;
        `;
      }

      return css`
        width: 8em;
        height: 8em;
      `;
    }}
  `,
});

export default RemotePersonAvatar;
