import { breakpoint } from "@theme/helper/breakpoint";
import { colorBrightness } from "@theme/helper/tools";
import styled from "styled-components";

export const SidebarContainer = styled.aside`
  background-color: ${({ theme }) => theme.surfaceColor};
  position: relative;
  margin-right: 1rem;
  height: 100%;
  width: fit-content;

  ${breakpoint.down("laptop")} {
    width: 22vw;
  }

  ${breakpoint.down("tablet")} {
    height: fit-content;
    width: 95%;
  }
`;

export const SideItemsContainer = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 2em;
  gap: 0.3rem;
  overflow-x: hidden;
  overflow-y: auto;
  flex-direction: column;
  /* scroll vertical setup */
  flex: 1 1 auto;
  overflow-y: auto;
  height: calc(100vh - 7rem);

  ${breakpoint.down("tablet")} {
    overflow-x: auto;
    overflow-y: hidden;
    flex-direction: row;
    height: fit-content;
    padding: 0.5em;
    margin-bottom: 0.2em;
    background-color: ${({ theme }) => theme.backgroundColor};
  }
`;

export const SideItemsEmpty = styled.div`
  height: 100%;
  width: 19.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
