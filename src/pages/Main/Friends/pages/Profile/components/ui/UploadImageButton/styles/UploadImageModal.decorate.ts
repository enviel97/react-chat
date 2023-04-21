import styled from "styled-components";

export const UploadImageModalContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  padding: 0.5rem;
  height: 100%;
  width: 100%;
  gap: 0.8rem;

  & h3 {
    padding: 0.5rem;
    margin: 0.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.disableColor};
    border-bottom: 2px solid currentColor;
    width: fit-content;
  }
`;

export const UploadImageAction = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.5rem;
  padding: 1rem 0;
`;
