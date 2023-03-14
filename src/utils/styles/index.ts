import styled from "styled-components";

export const Page = styled.div<PageProps>`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: ${({ height }) => height};
  width: 100%;
  position: relative;
  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-direction: ${({ flexDirection }) => flexDirection};
  overflow: hidden;
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
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};
  background: ${({ background }) => background};
`;

export const Inline = styled.div<InlineBoxProps>`
  float: ${({ float }) => float};

  &::after {
    clear: both;
  }
`;

export const Placeholder = styled.div<Sized>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;
