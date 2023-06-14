import { motion } from "framer-motion";
import { FC } from "react";
import styled from "styled-components";
import Styles from "../../styles/AttachmentSide.decorate";

interface OverplayProps extends Components {
  onClick: () => void;
}

const Overplay = styled(motion.div)`
  position: fixed;
  display: flex;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${({ theme }) => `${theme.backgroundColor}80`};
  backdrop-filter: blur(1%);
  z-index: 10000;
  cursor: pointer;

  justify-content: center;
  align-items: center;
`;

const Overlay: FC<OverplayProps> = ({ children, onClick }) => {
  return (
    <Overplay {...Styles.Animation.overplay} onClick={onClick}>
      {children}
    </Overplay>
  );
};
export default Overlay;
