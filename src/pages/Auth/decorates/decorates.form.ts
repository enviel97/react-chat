import styled from "styled-components";

export const FormDecorate = styled.form.attrs({ noValidate: true })`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 4rem;
  gap: 1rem;

  & .group {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    width: 100%;
  }
`;
