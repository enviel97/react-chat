import { colorBrightness } from "@theme/helper/tools";
import Spacing from "@components/Spacing";
import styled from "styled-components";

interface DividerProps {
  label?: string;
  direction?: "horizontal" | "vertical";
}

const DividerDecorate = styled.div<{ direction: string }>`
  color: ${({ theme }) => colorBrightness(theme.disableColor, -35)};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ direction }) => (direction === "horizontal" ? "100%" : "1px")};
  height: ${({ direction }) => (direction === "horizontal" ? "1px" : "100%")};

  & span {
    flex-shrink: 0;
    white-space: nowrap;
  }
  & hr {
    width: 100%;
    color: inherit;
    background-color: currentColor;
    border: 1px solid currentColor;
  }
`;

const Divider = (props: DividerProps) => {
  const { direction = "horizontal" } = props;
  return (
    <DividerDecorate className='divider' direction={direction}>
      <hr />
      {!!props.label && <Spacing.Horizontal />}
      <span className='caption'>{props.label}</span>
      {!!props.label && <Spacing.Horizontal />}
      <hr />
    </DividerDecorate>
  );
};

export default Divider;
