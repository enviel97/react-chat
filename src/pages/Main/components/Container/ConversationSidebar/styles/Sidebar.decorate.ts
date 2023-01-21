import { breakpoint } from "@common/helper/breakpoint";
import { colorBrightness } from "@common/helper/tools";
import styled from "styled-components";

export const SidebarContainer = styled.aside`
  background-color: ${({ theme }) => theme.surfaceColor};
  position: relative;
  margin-right: 1rem;

  height: 100%;
  width: fit-content;
  ${breakpoint.down("tablet")} {
    height: fit-content;
    width: 95%;
  }
`;

export const SideHeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 0.2em;

  font-size: 1.2rem;
  padding: 1rem 1.2rem;
  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: 0 -1em 1em ${({ theme }) => theme.black};

  & .filter {
    display: flex;
    gap: 0.5em;
    padding-top: 1.5em;

    &--button {
      width: 7em;
      height: fit-content;
    }
  }

  ${breakpoint.between("tablet", "mobile")} {
    flex-direction: row;
    & .filter {
      flex-direction: column;
      padding-top: 0;
      padding-left: 1em;
      margin-left: 1.5em;
      border-left: 1px solid
        ${({ theme }) => colorBrightness(theme.disableColor, -30)};
    }
  }
`;

export const SideItemsContainer = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 2em;
  gap: 0.3rem;
  overflow-x: hidden;
  overflow-y: auto;
  flex-direction: column;
  height: 100%;

  ${breakpoint.down("tablet")} {
    overflow-x: auto;
    overflow-y: hidden;
    flex-direction: row;
    height: fit-content;
    padding: 0.5em;
    margin-bottom: 0.2em;
    background-color: ${({ theme }) => theme.backgroundColor};

    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
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
