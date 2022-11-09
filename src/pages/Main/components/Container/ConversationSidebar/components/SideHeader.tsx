import { ButtonIconNeumorphism } from "@components/Button";
import { TbEdit } from "react-icons/tb";
import { SideHeaderContainer } from "../styles/Sidebar.decorate";

const SideHeader = () => {
  return (
    <SideHeaderContainer>
      <span>Conversations</span>
      <ButtonIconNeumorphism
        icon={<TbEdit className='AddOn' size={"1.5rem"} />}
      />
    </SideHeaderContainer>
  );
};

export default SideHeader;
