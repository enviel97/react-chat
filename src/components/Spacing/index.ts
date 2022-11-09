import styled from "styled-components";

interface SpacingProps {
  size?: string;
}

const Horizontal = styled.div<SpacingProps>`
  width: ${({ size }) => size ?? "1rem"};
`;

const Vertical = styled.div<SpacingProps>`
  height: ${({ size }) => size ?? "1rem"};
`;

const Spacing = {
  Horizontal: Horizontal,
  Vertical,
};

export default Spacing;
