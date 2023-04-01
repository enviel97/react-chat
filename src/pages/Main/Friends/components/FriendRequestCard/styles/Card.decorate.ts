import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.surfaceColor};
  height: fit-content;
  border-radius: 10px;
  overflow: hidden;
`;

export const CardHeader = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border: 0;
`;

export const CardBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 0.5em;
  font-weight: normal;
  justify-content: space-between;
`;

export const CardTitle = styled.h5`
  font-weight: bold;
  border-bottom: 2px solid ${({ theme }) => theme.disableColor};
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const CardBio = styled.span`
  display: -webkit-box;
  text-overflow: ellipsis;
  font-weight: 300;
  font-style: italic;
  overflow: hidden;
  height: 3rem;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 1rem;
  & b {
    font-weight: bold;
    color: ${({ theme }) => theme.primaryColor};
  }
`;
export const CardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5em;
`;

export const CardAction = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
  gap: 10px;
  & span {
    font-size: 1rem;
  }
`;
