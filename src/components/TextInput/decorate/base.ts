import { colorTheme } from "@theme/helper/tools";
import styled from "styled-components";

const _fillColor = ({ filled, theme }: any) =>
  colorTheme({ color: filled, theme });

const _borderColor = ({ borderColor, theme }: any) =>
  colorTheme({ color: borderColor, theme });

export const LockIcon = styled.div`
  padding: 0 0.5rem;
  & svg {
    height: 1.2rem;
    aspect-ratio: 1 / 1;
  }
`;

export const Eyes = styled.div`
  display: inline-flex;
  color: ${({ theme }) => theme.disableColor};
  padding-right: 0.5rem;
  visibility: hidden;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.secondaryColor};
  }
`;

export const FloatingLabel = styled.div<{
  height: string;
  width: string;
  filled?: string;
  borderColor?: string;
  fontSize?: string;
}>`
  position: relative;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  display: flex;
  align-items: center;
  background-color: ${_fillColor};
  color: ${({ theme }) => theme.disableColor};
  border: 2px solid ${_borderColor};

  & label {
    display: flex;
    align-items: center;
    position: absolute;
    width: max-content;
    font-weight: bold;
    text-transform: capitalize;
    left: 0;
    bottom: 0;
    top: 0;
    padding: 0 0.5rem;
    background-color: ${_fillColor};
    pointer-events: none;
    color: ${({ theme }) => theme.disableColor};
    transition: 0.5s ease-in-out;
    font-size: 1rem;
  }

  & input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    background-clip: text;

    -webkit-text-fill-color: ${({ theme }) =>
      theme.onBackgroundColor} !important;
    -webkit-box-shadow: 0 0 0 30px ${_fillColor} inset !important;
    box-shadow: 0 0 0 30px ${_fillColor} inset !important;

    -webkit-text-fill-color: ${({ theme }) =>
      theme.onBackgroundColor} !important;
  }
  & textarea {
    height: 100%;
    resize: none;
    & ~ label {
      top: 0;
      bottom: auto;
    }
  }
  & input,
  & textarea {
    width: 100%;
    padding: 1rem 0.5rem 0.5rem;
    background-color: inherit;
    outline: none;
    border: none;
    color: ${({ theme }) => theme.onBackgroundColor};
    font-size: ${({ fontSize }) => fontSize ?? "1rem"};

    & ~ label {
      color: ${({ theme }) => theme.disableColor};
    }
    &:valid,
    &:focus,
    &:disabled {
      & ~ label {
        color: ${({ theme }) => theme.secondaryColor};
      }
    }
    &:disabled {
      color: ${({ theme }) => theme.disableColor};
      background-color: ${({ theme }) => theme.white}10;
    }

    &:not(:placeholder-shown) {
      & ~ ${Eyes} {
        visibility: visible;
      }
    }
  }
  font-size: 1rem;

  & input[type="text"],
  & input[type="password"],
  & textarea {
    &:valid,
    &:focus,
    &:disabled {
      & ~ label {
        height: fit-content;
        width: fit-content;
        color: ${({ theme }) => theme.secondaryColor};
        transform: translate(0.5rem, calc(-50%));
        font-size: 0.85rem;
      }
    }
  }

  & input[type="number"] {
    text-align: right;

    /* Firefox */
    -moz-appearance: textfield;
    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;
