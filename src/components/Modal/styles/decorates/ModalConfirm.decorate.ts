import { clampSize } from "@theme/helper/tools";
import styled, { css } from "styled-components";

interface ActionProps {
  $position: "center" | "left" | "right";
}

export const ModalConfirmContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  width: 100%;
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ModalConfirmHeader = styled.div`
  width: 100%;
  padding: 0.5rem;
  & h6 {
    font-weight: bold;
    border-bottom: 1px solid currentColor;
    width: fit-content;
    color: ${({ theme }) => theme.disableColor};
  }
`;

export const ModalConfirmAction = styled.div<ActionProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1em;

  & button {
    padding: 1rem 0.5rem;
  }

  ${({ $position }) => {
    if ($position === "center") {
      return css`
        align-items: center;
        justify-content: center;
      `;
    }
    if ($position === "left") {
      return css`
        align-items: flex-start;
        justify-content: flex-start;
      `;
    }
    return css`
      align-items: flex-end;
      justify-content: flex-end;
    `;
  }}
`;

export const ModalConfirmBody = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 1rem;
  & p {
    display: flex;
    flex-direction: column;

    text-align: left;
    margin-bottom: 2rem;

    & span {
      font-size: inherit;
    }

    & strong {
      font-size: 110%;
      font-weight: bold;
      margin: 0em 1ch;
      &.highlight {
        color: ${({ theme }) => theme.notificationColor};
      }
    }
  }
`;
