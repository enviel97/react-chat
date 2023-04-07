import { breakpoint } from "@theme/helper/breakpoint";
import styled from "styled-components";

export const RelationShipContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  border-left: 2px solid ${({ theme }) => theme.surfaceColor};
  height: 100%;

  ${breakpoint.down("laptop")} {
    width: 150px;
  }
`;

export const UserProfileListContainer = styled.div`
  width: 100%;
  overflow: auto;
`;
