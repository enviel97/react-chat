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

const ButtonTextWrapper = styled(ButtonText)<{ isSelected: boolean }>`
  & button {
    border: 2px solid
      ${({ isSelected, theme }) =>
        colorBrightness(theme.surfaceColor, isSelected ? 20 : 0)};
    background-color: ${({ isSelected, theme }) =>
      colorBrightness(theme.surfaceColor, isSelected ? 20 : 0)};
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
      isSelected={isSelected}
      height={"fit-content"}
    />
  );
};

export default memo(FilterButton);
