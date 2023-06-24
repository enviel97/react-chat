import { ButtonText } from "@components/Button";
import useAppSelector from "@hooks/useAppSelector";
import { selectConversationType } from "@store/slices/ui";
import { colorBrightness } from "@theme/helper/tools";
import { FC, memo, useEffect, useState } from "react";
import styled, { css, useTheme } from "styled-components";

interface FilterButtonProps {
  text: string;
  onClick: () => void;
}

const ButtonTextWrapper = styled(ButtonText)`
  & button {
    height: 2rem;
  }
`;

const FilterButton: FC<FilterButtonProps> = function ({ text, onClick }) {
  const conversationType = useAppSelector(selectConversationType);
  const theme = useTheme();
  const [activeColor, setActiveColor] = useState<string>(
    colorBrightness(theme.surfaceColor, 0)
  );
  useEffect(() => {
    const filterType = text.toLowerCase() === "group" ? "group" : "direct";
    setActiveColor(() =>
      colorBrightness(
        theme.surfaceColor,
        conversationType === filterType ? 20 : 0
      )
    );
  }, [text, conversationType, theme]);

  return (
    <ButtonTextWrapper
      className='button'
      text={text}
      onClick={onClick}
      color={activeColor}
    />
  );
};

export default memo(FilterButton);
