import styled, { css } from "styled-components";
import IconCategory from "../components/IconCategory";

export const IconCategoryContainer = styled(IconCategory)`
  transition: filter 0.5s;
  ${({ isSelected, theme }) => {
    if (isSelected) {
      return css`
        color: ${theme.secondaryColor};
        filter: drop-shadow(-0.1em -0.05em ${theme.onBackgroundColor});
      `;
    }
    return css`
      color: ${theme.onBackgroundColor};
    `;
  }}
`;
