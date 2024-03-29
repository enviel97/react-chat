import { motion, MotionProps } from "framer-motion";
import { FC, memo } from "react";
import { IoClose } from "react-icons/io5";
import styled, { css, useTheme } from "styled-components";
interface ModalActionProps {
  download: (downloadLink: string) => void;
  closeModal: () => void;
}

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5rem;
  z-index: 100;
`;

const ButtonAnimation = (activeColor: string): MotionProps => {
  return {
    whileHover: {
      scale: 1.1,
      color: activeColor,
    },
    whileTap: {
      scale: 0.98,
    },
  };
};

const Button = styled(motion.div)`
  padding: 0.1em;
  border: none;
  outline: none;
  ${({ theme }) => {
    const color = `${theme.backgroundColor}80`;
    return css`
      background-color: ${color};
      box-shadow: 0 0 0.2em 0.4em ${color};
    `;
  }}
`;

const ModalAction: FC<ModalActionProps> = ({ closeModal }) => {
  const theme = useTheme();
  return (
    <Container>
      <Button {...ButtonAnimation(theme.errorColor)} onClick={closeModal}>
        <IoClose size={"1.5em"} />
      </Button>
    </Container>
  );
};

export default memo(ModalAction);
