import Divider from "@components/Divider";
import { TiGroup } from "react-icons/ti";
import {
  HeaderContainer,
  HeaderContentContainer,
} from "../../styles/Header.decorate";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContentContainer>
        <span>Friends</span>
        <TiGroup size={24} aria-hidden='true' />
      </HeaderContentContainer>
      <Divider />
    </HeaderContainer>
  );
};

export default Header;
