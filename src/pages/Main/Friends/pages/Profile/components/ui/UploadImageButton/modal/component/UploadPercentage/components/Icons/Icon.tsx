import { colorBrightness } from "@theme/helper/tools";
import { motion, Variants } from "framer-motion";
import { FC } from "react";
import { MdCheckCircle, MdError } from "react-icons/md";
import styled, { css } from "styled-components";

import UploadCloud from "./components/UploadCloud";

const UploadIconNotificationContainer = styled.span`
  margin: 1rem;
  padding: 1rem;
  border-radius: 50%;
  ${({ theme }) => {
    const mainColor = theme.surfaceColor;
    return css`
      border: 4px solid ${theme.backgroundColor};
      background: linear-gradient(145deg, #1e1e1e, #232323);
      box-shadow: inset 0.4rem 0.4rem 1.2rem ${colorBrightness(mainColor, -10)},
        inset 0.4rem 0.4rem 1.3rem ${colorBrightness(mainColor, -20)},
        inset 0.4rem 0.4rem 1.4rem ${colorBrightness(mainColor, -30)},
        inset -0.4px -0.4px 1.2rem ${colorBrightness(mainColor, 10)},
        inset -0.4px -0.4px 1.3rem ${colorBrightness(mainColor, 20)},
        inset -0.4px -0.4px 1.4rem ${colorBrightness(mainColor, 30)};
    `;
  }}
`;

const IconNotification = styled(motion.span)`
  position: relative;
  font-size: 4rem;
  background-color: red;
  & > svg {
    opacity: 1;
  }
`;

const IconAbsolute = styled(motion.span)`
  position: absolute;
  bottom: 50%;
  top: 50%;
  left: 50%;
  translate: -50% 0;
  height: fit-content;
  font-size: 40%;
  color: inherit;
  background-color: transparent;
  border-radius: 50%;
  box-shadow: inset 0 0 0px 10px ${({ theme }) => theme.surfaceColor};
`;

const IconVariables: Variants = {
  hidden: { opacity: 0, rotateY: 180 },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: {
      delay: 0.05,
      type: "spring",
      duration: 1,
      damping: 50,
      stiffness: 400,
    },
  },
};

const IconNotificationVariables: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0.5 },
};

const Icon: FC<UploadPercentageIconProps> = ({ type }) => {
  return (
    <UploadIconNotificationContainer>
      <IconNotification
        key={type}
        variants={IconNotificationVariables}
        initial='hidden'
        animate='visible'
        exit='hidden'
        transition={{ duration: 0.5 }}
      >
        <UploadCloud type={type} />

        {type === "error" && (
          <IconAbsolute variants={IconVariables}>
            <MdError />
          </IconAbsolute>
        )}
        {type === "success" && (
          <IconAbsolute variants={IconVariables}>
            <MdCheckCircle />
          </IconAbsolute>
        )}
      </IconNotification>
    </UploadIconNotificationContainer>
  );
};

export default Icon;
