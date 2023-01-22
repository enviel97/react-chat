import { TextFieldSearchNeumorphism } from "@components/TextInput";
import useAppDispatch from "@hooks/useAppDispatch";
import { selectedType } from "@store/slices/conversations";
import { SideHeaderContainer } from "../../styles/Sidebar.decorate";
import FilterButton from "../ui/FilterButton";

const SideHeader = () => {
  const dispatch = useAppDispatch();
  return (
    <SideHeaderContainer>
      <TextFieldSearchNeumorphism
        onSearch={function (search?: string | undefined): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className='filter'>
        <FilterButton
          text='Messenger'
          onClick={() => dispatch(selectedType("direct"))}
        />
        <FilterButton
          text='Group'
          onClick={() => dispatch(selectedType("group"))}
        />
      </div>
    </SideHeaderContainer>
  );
};

export default SideHeader;
