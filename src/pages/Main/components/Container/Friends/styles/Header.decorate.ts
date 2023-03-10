import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

export const HeaderContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 1em;

  & span {
    flex: 1;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;
