import { ButtonText } from "@components/Button";
import { FC } from "react";

interface FilterButtonProps {
  text: string;
  onClick: () => void;
}

const FilterButton: FC<FilterButtonProps> = ({ text, onClick }) => {
  return (
    <ButtonText
      className='filter--button'
      text={text}
      color='surface'
      onClick={onClick}
    />
  );
};

export default FilterButton;
