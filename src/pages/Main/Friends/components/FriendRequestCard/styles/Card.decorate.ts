import { avatarCardShadow, cardShadow } from "@pages/Main/Friends/styles/utils";
import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.surfaceColor};
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid var(--background-color);

  margin: 0.25rem;
  box-shadow: ${cardShadow};
`;

export const CardHeader = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border: 0;
  border-radius: inherit;
  box-shadow: ${avatarCardShadow};
  padding: 0.5rem 0.4rem 0.4rem 0.5rem;
  overflow: hidden;
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
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const CardBio = styled.span`
  display: -webkit-box;
  text-overflow: ellipsis;
  font-weight: 300;
  font-style: italic;
  overflow: hidden;
  height: 3rem;
  width: fit-content;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;
export const CardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
`;

export const CardAction = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row-reverse;
  gap: 10px;
`;
