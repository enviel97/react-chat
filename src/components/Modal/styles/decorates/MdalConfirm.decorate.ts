import styled, { css } from "styled-components";

export const ModalConfirmContainer = styled.div<{
  position?: "center" | "left" | "right";
}>`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 2em 3em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1em;

  & .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 1em;

    ${({ position }) => {
      if (position === "center") {
        return css`
          align-items: center;
          justify-content: center;
        `;
      }
      if (position === "left") {
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
  }

  & p {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 2rem;

    & span {
      font-size: inherit;
    }

    & strong {
      font-size: 1.1em;
      font-weight: bold;
      margin: 0em 0.2em;
      &.highlight {
        color: ${({ theme }) => theme.secondaryColor};
      }
    }
  }
`;
