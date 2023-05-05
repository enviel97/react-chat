import { breakpoint } from "@theme/helper/breakpoint";
import { clampSize } from "@theme/helper/tools";
import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface NavProps {
  $status: string;
}

export const iconVariants: Variants = {
  select: { height: "2em" },
  unselect: { height: "1.5em" },
};

export const SelectBorder = styled(motion.span)`
  position: absolute;
  border-bottom: 3px solid ${({ theme }) => theme.disableColor};
  bottom: 0;
  right: 0;
  width: 100%;
`;

export const NavLinkLabel = styled.span`
  display: flex;
  color: currentColor;
  font-size: inherit;
`;
export const NavLinkIcon = styled(motion.i)`
  position: relative;
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
  font-size: ${clampSize({
    minWidth: 50,
    maxWidth: 178.234,
    minFontSize: 0.9,
    maxFontSize: 1.2,
  })};
  ${breakpoint.down("mobile")} {
    flex-direction: column;
    gap: 0;
  }
  ${({ $status, theme }) => {
    if ($status === "active") {
      return css`
        color: ${theme.primaryColor};
        font-weight: bold;
      `;
    }
    return css`
      color: ${theme.disableColor};
      font-weight: normal;
    `;
  }};
`;
