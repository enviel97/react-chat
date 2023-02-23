import { colorBrightness } from "@theme/helper/tools";
import styled, { css } from "styled-components";
import ReactSelect from "react-select/async";

const neumorphism = css`
  box-shadow: 0.5em 0.5em 1em 0
      ${({ theme }) => colorBrightness(theme.backgroundColor, -10)},
    -0.2em -0.2em 0.4em 0
      ${({ theme }) => colorBrightness(theme.backgroundColor, 5)};
`;

export const SelectSearchContainer = styled(ReactSelect)`
  width: 100%;
  border-radius: 20px;
  ${neumorphism}

  & .${({ classNamePrefix }) => classNamePrefix} {
    &__control {
      /* background-color: ${({ theme }) => theme.backgroundColor};
      color: ${({ theme }) => theme.onBackgroundColor}; */
    }
    &__value-container {
      /* color: white !important; */
    }
    &__menu {
      /* background-color: ${({ theme }) => theme.backgroundColor};
      color: ${({ theme }) => theme.onBackgroundColor}; */
    }
  }
`;
