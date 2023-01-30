import { TextFieldSearchNeumorphism } from "@components/TextInput";
import useAppDispatch from "@hooks/useAppDispatch";
import { selectedType } from "@store/slices/conversations";
import { useCallback } from "react";
import FilterButton from "./components/ui/FilterButton";
import {
  SideHeaderContainer,
  SideHeaderFilter,
} from "./styles/SideHeader.decorate";

const SideHeader = () => {
  const dispatch = useAppDispatch();
  const filter = useCallback(
    (type: "direct" | "group") => {
      dispatch(selectedType(type));
    },
    [dispatch]
  );

  return (
    <SideHeaderContainer>
      <TextFieldSearchNeumorphism
        onSearch={function (search?: string | undefined): void {
          throw new Error("Function not implemented.");
        }}
      />
      <SideHeaderFilter>
        <FilterButton text='Messenger' onClick={() => filter("direct")} />
        <FilterButton text='Group' onClick={() => filter("group")} />
      </SideHeaderFilter>
    </SideHeaderContainer>
  );
};

export default SideHeader;
