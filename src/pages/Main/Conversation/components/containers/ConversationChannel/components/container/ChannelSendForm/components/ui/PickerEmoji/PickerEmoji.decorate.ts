import styled, { css } from "styled-components";

interface Props {
  $isOpen: boolean;
}

export const PickerEmojiContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: red;
  height: fit-content;
  width: fit-content;
`;

export const PickerContainer = styled.div<Props>`
  position: absolute;
  bottom: 50%;
  right: 50%;
  ${({ $isOpen }) => {
    if ($isOpen) {
      return css`
        display: initial;
        visibility: visible;
        pointer-events: auto;
      `;
    }

    return css`
      display: none;
      visibility: hidden;
      pointer-events: none;
    `;
  }}
`;
