import styled from "styled-components";

export const Page = styled.div<PageProps>`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  width: 100%;

  position: relative;
  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-direction: ${({ flexDirection }) => flexDirection};
`;

export const Box = styled.div<PageProps>`
  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-direction: ${({ flexDirection }) => flexDirection};
  gap: ${({ gap }) => gap};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: ${({ background }) => background};
`;

export const Placeholder = styled.div<Sized>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;
