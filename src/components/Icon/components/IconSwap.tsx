import { AnimatePresence, motion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import { IconName, IconSwapMapping } from "../common/IconSwapMapping";

interface IconProps {
  name: IconName;
  size?: string;
  color?: string;
  defaultState?: boolean;
}

export type IconsSwapController = {
  swap: () => void;
  setSwap: (state: boolean) => void;
};

const IconBox = styled(motion.div)`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  color: inherit;
  & svg {
    position: absolute;
    width: 100%;
    padding: 0.5rem;
    color: inherit;
  }
`;

const IconSwap = forwardRef<IconsSwapController, IconProps>(
  ({ size, color, name, defaultState = false }, controller) => {
    const [active, setActive] = useState<boolean>(defaultState);

    const control = useCallback((): IconsSwapController => {
      return {
        swap: () => setActive((prev) => !prev),
        setSwap: (state) => setActive(state),
      };
    }, []);

    useImperativeHandle(controller, control, [control]);

    const IconProvider = useMemo(
      () => IconSwapMapping({ size, color }).get(name),
      [name, size, color]
    );

    if (!IconProvider) return <></>;
    return (
      <AnimatePresence>
        <IconBox
          variants={{
            initial: { opacity: 0 },
            on: { rotateX: "0deg", opacity: 1 },
            off: { rotateX: "360deg", opacity: 1 },
          }}
          initial='initial'
          animate={active ? "on" : "off"}
          exit='initial'
          style={{ originX: "center", originY: "center" }}
        >
          {active && IconProvider.on}
          {!active && IconProvider.off}
        </IconBox>
      </AnimatePresence>
    );
  }
);

export default IconSwap;
