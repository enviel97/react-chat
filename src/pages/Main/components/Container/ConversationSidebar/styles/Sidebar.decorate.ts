import styled from "styled-components";

const widthSideBar = "350px";
const footerSideBar = "50px";

export const SidebarContainer = styled.aside`
  height: 100%;
  width: ${widthSideBar};
  background-color: ${({ theme }) => theme.surfaceColor};
  position: absolute;
  top: 0;
  left: 0;
`;

export const SideFooterContainer = styled.footer`
  width: ${widthSideBar};
  height: ${footerSideBar};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.surfaceColor};
`;

export const SideHeaderContainer = styled.header`
  position: fixed;
  height: 75px;
  width: ${widthSideBar};
  left: 0;
  right: 0;
  display: flex;
  font-size: 1.2rem;
  padding: 1rem 1.2rem;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: 0 1rem 1rem ${({ theme }) => theme.black};
`;

export const SideItemsContainer = styled.div`
  margin-top: 80px;
  height: calc(100% - ${footerSideBar} - 80px);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  overflow-y: auto;
`;

export const SideItemsEmpty = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SideItemContainer = styled.div`
  cursor: pointer;
  height: fit-content;
  display: flex;
  background-color: ${({ theme }) => theme.backgroundColor};
  align-items: center;
  padding: 0.2rem 0.5rem;
  gap: 0.5rem;
  & .Message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    padding: 0.5rem 0;
    flex: 1;

    & .Messenger {
      display: flex;
      align-items: center;
      flex: 1;
      font-weight: bold;
    }

    & .Content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 300;

      &.New {
        font-weight: bold;
      }

      &--Time {
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        & .Circle {
          height: 0.5rem;
          aspect-ratio: 1/1;
          background-color: ${({ theme }) => theme.successColor};
          border-radius: 50%;
        }
      }

      &--Text {
        font-size: 0.9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
`;
