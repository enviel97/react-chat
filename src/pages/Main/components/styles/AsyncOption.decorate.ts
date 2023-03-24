import { colorBrightness } from "@theme/helper/tools";
import styled from "styled-components";

export const AsyncOptionContainer = styled.span`
  font-size: 1em;
  font-weight: bold;
  & .sub {
    margin-left: 0.5em;
    font-size: 0.8em;
    color: ${({ theme }) => colorBrightness(theme.disableColor, 20)};
    font-weight: normal;
  }
`;
