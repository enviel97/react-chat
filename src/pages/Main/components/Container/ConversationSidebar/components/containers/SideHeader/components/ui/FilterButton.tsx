import { ButtonText } from "@components/Button";
import useAppSelector from "@hooks/useAppSelector";
import { FC, memo, useMemo } from "react";

interface FilterButtonProps {
  text: string;
  onClick: () => void;
}

const FilterButton: FC<FilterButtonProps> = function ({ text, onClick }) {
  const getCurrentSelect = useAppSelector((state) => state.conversation.type);

  const color = useMemo(() => {
    const filterType = text.toLowerCase() === "group" ? "group" : "direct";
    return getCurrentSelect === filterType ? "secondary" : "surface";
  }, [getCurrentSelect, text]);

  return (
    <ButtonText
      className='button'
      text={text}
      color={color}
      onClick={onClick}
      width={"7em"}
      height={"fit-content"}
    />
  );
};

export default memo(FilterButton);
