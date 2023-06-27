import { motion } from "framer-motion";
import { FC, memo, ReactNode, useMemo } from "react";
import {
  HiChatBubbleLeftRight,
  HiUserMinus,
  HiVideoCamera,
  HiPhone,
} from "react-icons/hi2";
import { IconContext } from "react-icons/lib";
import styled from "styled-components";

type IconName = "message" | "unfriend" | "video_call" | "audio_call";
type IconMap = { element: ReactNode; active: string };

interface IconClickProps {
  onClick: () => void;
  icon: IconName;
}

const IconMapping = new Map<IconName, IconMap>([
  ["message", { active: "#ffe000", element: <HiChatBubbleLeftRight /> }],
  ["unfriend", { active: "#f40000", element: <HiUserMinus /> }],
  ["video_call", { active: "#f40000", element: <HiVideoCamera /> }],
  ["audio_call", { active: "#14f400", element: <HiPhone /> }],
]);

const Container = styled(motion.div)`
  height: 3.125rem;
  padding: 0.075rem;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 50%;
  cursor: pointer;
  filter: drop-shadow(0 0 0.5em var(--disable-color));
`;

const IconClick: FC<IconClickProps> = ({ icon, onClick }) => {
  const Icon = useMemo(() => IconMapping.get(icon), [icon]);

  return (
    <Container
      id={icon}
      whileHover={{
        color: Icon?.active,
        y: "-7%",
        backgroundColor: "var(--background-color)",
        transition: { duration: 0 },
      }}
      whileTap={{ y: "1%", opacity: 0.8, scale: 0.95 }}
      style={{ color: "var(--disable-color)" }}
      onClick={onClick}
    >
      <IconContext.Provider value={{ size: "55%" }}>
        {Icon?.element}
      </IconContext.Provider>
    </Container>
  );
};

export default memo(IconClick);
