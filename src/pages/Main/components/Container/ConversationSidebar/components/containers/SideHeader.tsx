import { TextFieldSearchNeumorphism } from "@components/TextInput";
import { FC } from "react";
import { SideHeaderContainer } from "../../styles/Sidebar.decorate";
import FilterButton from "../ui/FilterButton";

interface SideHeaderProps {
  onFilter: (type: "direct" | "group") => void;
}

const SideHeader: FC<SideHeaderProps> = ({ onFilter }) => {
  return (
    <SideHeaderContainer>
      <TextFieldSearchNeumorphism
        onSearch={function (search?: string | undefined): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className='filter'>
        <FilterButton text='Messenger' onClick={() => onFilter("direct")} />
        <FilterButton text='Group' onClick={() => onFilter("group")} />
      </div>
    </SideHeaderContainer>
  );
};

export default SideHeader;
