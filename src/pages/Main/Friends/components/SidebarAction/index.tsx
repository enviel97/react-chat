import { FC, useState } from "react";
import FriendsTab from "./components/container/FriendsTab";
import RequestTab from "./components/container/RequestTab";
import {
  SideBarActionContainer,
  SidebarActionItemContainer,
} from "./styles/SidebarAction.decorate";

interface SidebarActionProps {
  initTabDefault?: number;
}

const SidebarAction: FC<SidebarActionProps> = ({ initTabDefault }) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(
    initTabDefault
  );
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    initTabDefault
  );

  return (
    <SideBarActionContainer onHoverEnd={() => setActiveIndex(selectedIndex)}>
      {[FriendsTab, RequestTab].map((TabButton, index) => {
        const isActive = index === activeIndex;
        const isSelected = index === selectedIndex;
        return (
          <SidebarActionItemContainer
            key={`${index}`}
            onHoverStart={() => setActiveIndex(index)}
            onClick={() => {
              setSelectedIndex(index);
              setActiveIndex(index);
            }}
          >
            <TabButton isActive={isActive} isSelected={isSelected} />
          </SidebarActionItemContainer>
        );
      })}
    </SideBarActionContainer>
  );
};

export default SidebarAction;
