import { breakpoint } from "@theme/helper/breakpoint";
import { colorBrightness } from "@theme/helper/tools";
import styled from "styled-components";

export const SideHeaderFilter = styled.div`
  display: flex;
  gap: 0.5em;
  padding-top: 1.5em;
  width: 100%;
  & .button {
    flex: 1;
  }
  ${breakpoint.between("tablet", "mobile")} {
    width: fit-content;
    & .button {
      width: 7em;
    }
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

  ${breakpoint.between("tablet", "mobile")} {
    flex-direction: row;
    & ${SideHeaderFilter} {
      flex-direction: column;
      padding-top: 0;
      padding-left: 1em;
      margin-left: 1.5em;
      border-left: 1px solid
        ${({ theme }) => colorBrightness(theme.disableColor, -30)};
    }
  }
`;

export const SideHeaderSearchContainer = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
