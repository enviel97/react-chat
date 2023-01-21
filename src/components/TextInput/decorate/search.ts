import { neumorphismBoxShadow } from "@common/helper/tools";
import styled from "styled-components";
import { FloatingLabel } from "./base";

export const TextInput = styled(FloatingLabel)``;

export const ButtonSearch = styled.button`
  background-color: transparent;
  height: fit-content;
  width: fit-content;
  padding: 0.5rem;
`;

export const SearchNeumorphism = styled.form<{
  height: string;
  width: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: relative;
  border: none;
  & .searchTextField {
    border: none;
    box-shadow: ${neumorphismBoxShadow(true, {
      x: 10,
      spears: -1,
      background: "#121212",
    })};
    border-radius: 100px;
    & input,
    textarea {
      padding: 1em 1.5em;
    }
    & ~ label {
      visibility: hidden;
    }
  }

  & ${ButtonSearch} {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);

    border: none;
    background-color: transparent;
  }
`;
