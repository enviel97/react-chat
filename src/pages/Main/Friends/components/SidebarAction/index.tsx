import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";
import { updateTabFriends } from "@store/slices/ui";
import selectTabFriends from "@store/slices/ui/selector/getTabFriends";
import {
  FC,
  memo,
  NamedExoticComponent,
  useEffect,
  useMemo,
  useState,
} from "react";
import FriendsTab from "./components/container/FriendsTab";
import ProfileTab from "./components/container/ProfileTab";
import RequestTab from "./components/container/RequestTab";
import { NavLinkAnimationController } from "./components/ui/NavLinkActions";
import {
  SideBarActionContainer,
  SidebarActionItemContainer,
} from "./styles/SidebarAction.decorate";

interface TabOption {
  index: number;
  Node: NamedExoticComponent<NavLinkAnimationController>;
}
interface SidebarActionProps {}

const SidebarAction: FC<SidebarActionProps> = () => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();
  const tabSelected = useAppSelector(selectTabFriends);
  const dispatch = useAppDispatch();
  const tabList = useMemo(() => {
    return new Map<"profile" | "list" | "request", TabOption>([
      ["profile", { Node: ProfileTab, index: 0 }],
      ["list", { Node: FriendsTab, index: 1 }],
      ["request", { Node: RequestTab, index: 2 }],
    ]);
  }, []);

  useEffect(() => {
    const { index } = tabList.get(tabSelected) || { index: 0 };
    setActiveIndex(index);
    setSelectedIndex(index);
    // eslint
  }, [tabList, tabSelected]);

  return (
    <SideBarActionContainer
      onClick={(e) => e.stopPropagation()}
      onHoverEnd={() => setActiveIndex(selectedIndex)}
    >
      {[...tabList.values()].map(({ Node }, index) => {
        const isActive = index === activeIndex;
        const isSelected = index === selectedIndex;
        return (
          <SidebarActionItemContainer
            key={`${index}`}
            onHoverStart={() => setActiveIndex(index)}
            onClick={(e) => {
              e.stopPropagation();
              const currentHref = [...tabList.keys()].at(index)!;
              dispatch(updateTabFriends(currentHref));
            }}
          >
            <Node
              key={`TabButton${index}`}
              isActive={isActive}
              isSelected={isSelected}
            />
          </SidebarActionItemContainer>
        );
      })}
    </SideBarActionContainer>
  );
};

export default memo(SidebarAction);
