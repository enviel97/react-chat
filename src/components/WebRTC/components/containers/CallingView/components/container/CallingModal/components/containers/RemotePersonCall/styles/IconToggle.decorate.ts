import styled from "styled-components";

interface IconToggleDecorateProps {
  $checked: boolean;
}

const IconToggleDecorate = Object.freeze({
  Disabled: styled.span`
    position: absolute;
    bottom: 0em;
    left: 50%;
    filter: drop-shadow(0 0 0.2em #212121) drop-shadow(0 0 0.4em #212121);
  `,
  Box: styled.div``,
  Button: styled.button<IconToggleDecorateProps>`
    position: relative;
    width: fit-content;
    height: fit-content;
    display: block;
    padding: 0.25em;
    border: none;
    outline: none;
    background-color: transparent;
    user-select: none;
    color: ${({ $checked, theme }) =>
      $checked ? theme.white : `${theme.gray}`};
    & svg {
      filter: drop-shadow(0 0 0.2em #000000) drop-shadow(0 0 0.4em #000000);
    }

    &:active:not(:disabled) {
      scale: 0.8;
      filter: none;
    }

    &:disabled {
      color: var(--gray);
      filter: brightness(50%);
      & svg {
        filter: none;
      }
    }
  `,
});
export default IconToggleDecorate;
