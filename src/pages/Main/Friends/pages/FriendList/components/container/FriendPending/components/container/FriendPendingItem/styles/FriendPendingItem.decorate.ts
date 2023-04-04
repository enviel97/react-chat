import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: fit-content;
  box-sizing: border-box;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.surfaceColor};
`;

export const Title = styled.div`
  height: 4rem;
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 50%;
  overflow: hidden;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  padding-right: 2rem;
  & span {
    &:nth-of-type(1) {
      font-size: 1rem;
      font-weight: bold;
    }
    &:nth-of-type(2) {
      font-weight: 300;
      font-size: 0.8em;
      font-style: italic;
    }
  }
`;

export const Action = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;
