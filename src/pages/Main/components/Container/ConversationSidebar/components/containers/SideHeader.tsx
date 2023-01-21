import { TextFieldSearchNeumorphism } from "@components/TextInput";
import { SideHeaderContainer } from "../../styles/Sidebar.decorate";
import FilterButton from "../ui/FilterButton";

const SideHeader = () => {
  return (
    <SideHeaderContainer>
      <TextFieldSearchNeumorphism
        onSearch={function (search?: string | undefined): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className='filter'>
        <FilterButton text='Messenger' onClick={() => {}} />
        <FilterButton text='Group' onClick={() => {}} />
      </div>
    </SideHeaderContainer>
  );
};

export default SideHeader;
