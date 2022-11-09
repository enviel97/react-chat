import styled from "styled-components";

export const ModalConfirmContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 2em 3em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1em;

  & .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: flex-end;
    justify-content: flex-end;
  }

  & p {
    display: flex;
    flex-direction: column;
    text-align: left;

    & span {
      font-size: inherit;
    }

    & strong {
      font-size: 1.1em;
      font-weight: bold;
    }
  }
`;
