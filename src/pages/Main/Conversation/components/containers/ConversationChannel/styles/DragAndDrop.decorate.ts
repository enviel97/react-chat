import styled from "styled-components";

export const DragAndDropZoneContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  & > p {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;

    background-color: ${({ theme }) => theme.surfaceColor};
    display: flex;
    opacity: 0.95;
    z-index: 100000;
    font-weight: bold;
    text-transform: capitalize;
    font-size: 1.5em;
    padding: 2rem;
    align-items: center;
    justify-content: center;
  }
`;
