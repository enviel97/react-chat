import { breakpoint } from "@theme/helper/breakpoint";
import styled from "styled-components";

export const PersonCallContainer = styled.div`
  position: relative;
  background-color: var(--surface-color);
  width: auto;
  height: 100%;
  aspect-ratio: 320 / 240;
  overflow: hidden;

  ${breakpoint.down("tablet")} {
    width: 100%;
    height: auto;
    aspect-ratio: 240 / 320;
  }
`;

export const PersonCallAction = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: fit-content;
  width: 6.25rem;

  padding: 2rem 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;
