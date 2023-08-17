import { motion } from "framer-motion";
import { FC, useState } from "react";
import styled from "styled-components";

interface SlideButtonProps {
  defaultState?: boolean;
  animateDuration: number;
  onClick?: (isExpanded: boolean) => void;
}

const Container = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  aspect-ratio: 1/1;
  user-select: none;
`;
const BarContainer = styled(motion.span)`
  position: absolute;
  background-color: currentColor;
  border-radius: 100px;
  width: 5px;
  height: 50%;
`;

const SlideButton: FC<SlideButtonProps> = ({
  onClick,
  defaultState = false,
  animateDuration = 1, // once second,
}) => {
  const [isExpanded, setExpanded] = useState<boolean>(defaultState);
  const deg = 40;
  const handleOnToggleExpanded = () => {
    setExpanded((prev) => {
      const _isExpanded = !prev;
      onClick && onClick(_isExpanded);
      return _isExpanded;
    });
  };

  return (
    <Container
      whileHover={{
        color: "var(--white)",
        scale: 1.1,
        transition: { color: { duration: 0 }, scale: { duration: 0.2 } },
      }}
      style={{ height: 42, color: "#454545" }}
      onClick={handleOnToggleExpanded}
    >
      <BarContainer
        variants={{
          expanded: { rotate: deg },
          collapse: { rotate: -deg },
        }}
        transition={{ duration: animateDuration - 0.65 }}
        style={{ y: "20%" }}
        initial={!isExpanded ? "expanded" : "collapse"}
        animate={isExpanded ? "expanded" : "collapse"}
      />
      <BarContainer
        variants={{
          expanded: { rotate: -deg },
          collapse: { rotate: deg },
        }}
        transition={{ duration: animateDuration - 0.65 }}
        style={{ y: "80%" }}
        initial={!isExpanded ? "expanded" : "collapse"}
        animate={isExpanded ? "expanded" : "collapse"}
      />
    </Container>
  );
};

export default SlideButton;
