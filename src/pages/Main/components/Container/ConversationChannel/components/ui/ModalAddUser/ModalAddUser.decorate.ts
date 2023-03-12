import styled from "styled-components";

export const ModalContainer = styled.div`
  min-height: 100px;
  width: 100%;
  padding: 1em 1.5em;
`;

export const ModalHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;

  gap: 0.5em;
  font-size: 1em;
  font-weight: bold;
  padding: 0.5em 0;
  border-bottom: 1px solid ${({ theme }) => theme.surfaceColor};
`;

export const ModalBodyContainer = styled.div`
  & form {
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: flex-end;
  }
`;
