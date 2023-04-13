import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import Input from "../component/Input";

export const ErrorMessage = styled(motion.div)`
  color: ${(props) => props.theme.errorColor};
  padding: 0 1rem;

  & .mess {
    position: absolute;
    overflow: hidden;
    font-size: 0.8em;
    color: ${({ theme }) => theme.white};
    background-color: red;
    padding: 0rem 0.4rem;
    border-radius: 5px 5px 0 5px;
    white-space: nowrap;
    top: 100%;
    left: 0;
  }
`;

export const InputWrapper = styled(Input)`
  border: none;
  outline: none;
  display: flex;
  background-color: transparent;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  font-weight: normal;
  color: ${({ theme }) => theme.onBackgroundColor};
  font-size: 1em;
  padding: 0rem 0.8rem;

  ${({ theme }) => {
    return css`
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-clip: text;

        -webkit-text-fill-color: ${theme.onBackgroundColor} !important;
        -webkit-box-shadow: 0 0 0 30px ${theme.backgroundColor} inset !important;
        box-shadow: 0 0 0 30px ${theme.backgroundColor} inset !important;

        -webkit-text-fill-color: ${({ theme }) =>
          theme.onBackgroundColor} !important;
      }
    `;
  }}

  ${(props) => {
    if (props.type === "text") {
      return css`
        max-height: fit-content;
      `;
    }
    if (props.type === "textarea") {
      return css`
        resize: none;
      `;
    }
  }}

  &::placeholder {
    color: ${({ theme }) => theme.disableColor};
    font-weight: 300;
    font-style: italic;
    font-size: 0.9em;
  }
`;

export const LabelWrapper = styled.label`
  position: absolute;
  display: flex;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: inherit;
  height: fit-content;
  width: fit-content;
  color: ${({ theme }) => theme.primaryColor};
  transform: translate(1rem, calc(-50%));
  top: 0;
  left: 0;
  font-size: 1.2rem;
  padding: 0 0.5rem;
  border-left: 2.5px solid;
  border-right: 2.5px solid;
  border-color: ${({ theme }) => theme.surfaceColor};

  ${(props) => {
    if (props.itemType === "textarea") {
      return css`
        align-items: flex-start;
        justify-content: flex-start;
      `;
    }
    return css`
      align-items: center;
      justify-content: center;
    `;
  }};
`;

export const EditableProfileFieldContainer = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.surfaceColor};
  padding: 1.5rem 0rem;

  ${InputWrapper} {
    &:disabled {
      color: ${({ theme }) => theme.disableColor};
      background-color: ${({ theme }) => theme.white}10;
    }
  }
`;
