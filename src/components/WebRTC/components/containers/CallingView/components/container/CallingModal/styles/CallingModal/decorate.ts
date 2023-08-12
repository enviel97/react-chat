import { breakpoint } from "@theme/helper/breakpoint";
import styled from "styled-components";

export const CallingContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  gap: 1em;
  border-radius: inherit;

  ${breakpoint.down("tablet")} {
    flex-direction: column;
  }
`;
