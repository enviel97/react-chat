import styled from "styled-components";

export const MenuItemContainer = styled.div<MenuToggleProps>`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 0.5em;
  height: ${({ size }) => `calc(${size} / 2)`};
  aspect-ratio: 1/1;
  padding: 0.5em;
  z-index: -1;
  border-radius: ${({ size }) => size};
  transition: width 0.25s, height 0.25s;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
`;

export const MenuToggle = styled.div<MenuToggleProps>`
  position: relative;
  height: ${({ size }) => size};
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/2;
  border-radius: 25%;
  cursor: pointer;
  font-size: 1.2rem;

  &:active svg {
    width: 80%;
    height: 60%;
  }

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.surfaceColor};
  }

  &.active {
    color: ${({ theme }) => theme.primaryColor};
    & ~ ${MenuItemContainer} {
      height: ${({ size }) => size};
      transform: translateY(-${({ size }) => size});
      background-color: ${({ theme }) => theme.surfaceColor};
      z-index: 1;
      box-shadow: 0 0.5em 0.5em ${({ theme }) => theme.black};
    }
  }
`;

export const MenuContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
