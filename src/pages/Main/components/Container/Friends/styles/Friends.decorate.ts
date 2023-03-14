import { breakpoint } from "@theme/helper/breakpoint";
import styled from "styled-components";

export const FriendContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  border-left: 2px solid ${({ theme }) => theme.surfaceColor};
  height: 100%;

  ${breakpoint.down("laptop")} {
    width: 150px;
  }
`;
