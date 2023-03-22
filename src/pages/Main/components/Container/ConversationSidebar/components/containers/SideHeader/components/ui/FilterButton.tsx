import { ButtonText } from "@components/Button";
import useAppSelector from "@hooks/useAppSelector";
import { selectConversationType } from "@store/slices/ui";
import { colorBrightness } from "@theme/helper/tools";
import { FC, memo, useMemo } from "react";
import styled from "styled-components";

interface FilterButtonProps {
  text: string;
  onClick: () => void;
}

const ButtonTextWrapper = styled(ButtonText)<{ ["data-select"]: boolean }>`
  & button {
    border: 2px solid
      ${(props) =>
        colorBrightness(
          props.theme.surfaceColor,
          props["data-select"] ? 20 : 0
        )};
    background-color: ${(props) =>
      colorBrightness(props.theme.surfaceColor, props["data-select"] ? 20 : 0)};
  }
`;

const FilterButton: FC<FilterButtonProps> = function ({ text, onClick }) {
  const getCurrentSelect = useAppSelector(selectConversationType);

  const isSelected = useMemo(() => {
    const filterType = text.toLowerCase() === "group" ? "group" : "direct";
    return getCurrentSelect === filterType;
  }, [getCurrentSelect, text]);

  return (
    <ButtonTextWrapper
      className='button'
      text={text}
      onClick={onClick}
      data-select={isSelected}
      height={"fit-content"}
    />
  );
};

export default memo(FilterButton);
