import useCount from "@components/Animation/hooks/useCount";
import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { clampSize } from "@theme/helper/tools";
import styled from "styled-components";

type Position = {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
};

interface BadgeQuantityProps {
  quantity?: number;
  position?: Position;
}

export const BadgeQuantityContainer = styled(motion.div)`
  position: absolute;
  font-weight: bold;
  text-align: center;
  padding: 0.2em 0.25em;
  border-radius: 0.5em;
  color: ${({ theme }) => theme.onNotificationColor};
  background-color: ${({ theme }) => theme.notificationColor};
  font-size: ${clampSize({
    minFontSize: 0.6,
    maxFontSize: 0.8,
    minWidth: 20,
    maxWidth: 25.59,
  })};
  height: fit-content;
  min-width: 2em;
`;

const BadgeQuantity: FC<BadgeQuantityProps> = ({
  quantity,
  position = { right: -0.5, top: -1 },
}) => {
  const [_count, setCount] = useState<number>();
  useEffect(() => {
    if (!quantity) return;
    setCount(Math.min(quantity, 99));
  }, [quantity]);

  const { count } = useCount({ quantity: _count });

  return (
    <AnimatePresence>
      {quantity && (
        <BadgeQuantityContainer
          variants={{
            hidden: { scale: 0, y: 10, x: -10 },
            visible: { scale: 1, y: 0, x: 0 },
          }}
          style={{
            top: position.top?.toEm() ?? "auto",
            right: position.right?.toEm() ?? "auto",
            left: position.left?.toEm() ?? "auto",
            bottom: position.bottom?.toEm() ?? "auto",
          }}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          <motion.span>{count}</motion.span>
          {quantity > 99 && <span>+</span>}
        </BadgeQuantityContainer>
      )}
    </AnimatePresence>
  );
};
export default BadgeQuantity;
