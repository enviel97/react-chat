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
  position: relative;
  border: none;
  & .textfield {
    border: none;
    box-shadow: ${neumorphismBoxShadow(true, {
      x: 10,
      spears: -1,
      background: "#121212",
    })};
    border-radius: 100px;
    & input {
      padding: 0.75rem 1.2rem;
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
