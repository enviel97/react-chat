import { breakpoint } from "@theme/helper/breakpoint";
import { colorBrightness } from "@theme/helper/tools";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";

export const SidebarContainer = styled.aside`
  background-color: ${({ theme }) => theme.surfaceColor};
  position: relative;
  margin-right: 1rem;
  height: 100%;
  width: 20svw;

  ${breakpoint.down("tablet")} {
    height: fit-content;
    width: 95%;
  }
`;

export const SideItemsContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding-bottom: 2em;
  gap: 0.3rem;
  flex-direction: column;
  /* scroll vertical setup */
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100% - 10rem);

  ${breakpoint.down("tablet")} {
    overflow-x: auto;
    overflow-y: hidden;
    flex-direction: row;
    height: 6.5rem;
    padding: 0.5em;
    margin-bottom: 0.2em;
    background-color: ${({ theme }) => theme.backgroundColor};
  }
`;

export const SideItemsEmpty = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${breakpoint.down("tablet")} {
    display: none;
    visibility: hidden;
  }
`;

export const SideItemContainer = styled.div`
  display: flex;
  height: fit-content;
  margin-bottom: 0.3em;
  margin-right: 0.1em;
  cursor: pointer;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 5px;
  align-items: center;
  padding: 0.2rem 0.5rem;
  gap: 0.5rem;
  &.active {
    background-color: ${({ theme }) =>
      colorBrightness(theme.surfaceColor, 50)}25;
  }
`;

export const SideItemContent = styled.div`
  width: 200px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 0.5rem 0;
  flex: 1;

  ${breakpoint.down("tablet")} {
    visibility: collapse;
    display: none;
  }

  & .Content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 300;

    &.New {
      font-weight: bold;
    }

    &--Time {
      flex: 1;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5rem;
      & .Circle {
        height: 0.5rem;
        aspect-ratio: 1/1;
        background-color: ${({ theme }) => theme.successColor};
        border-radius: 50%;
      }
    }

    &--Text {
      flex: 2;
      font-size: 0.9rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    &--Default {
      font-weight: 500;
      font-size: 0.8rem;
      font-style: italic;
    }
  }
`;

export const SideItemLoading = styled(motion.span)`
  position: absolute;
  bottom: 1.5rem;
  right: 1rem;
  box-sizing: border-box;
  height: fit-content;
  border-radius: 50%;
  padding: 0.25rem;
  ${({ theme }) => {
    const color = theme.backgroundColor;
    const dark = colorBrightness(color, -30);
    const light = colorBrightness(color, 30);
    return css`
      border: 2px solid ${color};
      box-shadow: 0.15rem 0.15rem 1rem ${dark}, -0.15rem -0.15rem 1rem ${light};
    `;
  }}
`;
