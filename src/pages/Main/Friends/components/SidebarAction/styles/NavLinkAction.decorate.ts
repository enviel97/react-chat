import { breakpoint } from "@theme/helper/breakpoint";
import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import styled, { css } from "styled-components";

interface NavProps {
  status: string;
}

export const iconVariants: Variants = {
  select: { height: "2em" },
  unselect: { height: "1.5em" },
};

export const SelectBorder = styled(motion.span)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-bottom: 3px solid ${({ theme }) => theme.disableColor};
`;

export const NavLinkLabel = styled.span`
  display: flex;
  color: currentColor;
  font-size: 1em;
  ${breakpoint.down("mobile")} {
    font-size: 1em;
  }
`;
export const NavLinkIcon = styled(motion.i)<NavProps>`
  height: 1.5em;
  aspect-ratio: 1/1;
  color: currentColor;
`;

export const NavLinkItem = styled(motion(Link))<NavProps>`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0.5em;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  transition: height 4s ease-in-out;
  ${breakpoint.down("mobile")} {
    flex-direction: column;
    gap: 0;
  }
  ${({ status, theme }) => {
    if (status === "active") {
      return css`
        font-size: 1.1em;
        color: ${theme.primaryColor};
        font-weight: bold;
      `;
    }
    return css`
      font-size: 1em;
      color: ${theme.disableColor};
      font-weight: normal;
    `;
  }};
`;

export const KTooltip = styled(Tooltip)`
  padding: 0em 0.5em;
  font-weight: bold;
  background-color: ${({ theme }) => theme.notificationColor};
  color: ${({ theme }) => theme.onNotificationColor};
`;
