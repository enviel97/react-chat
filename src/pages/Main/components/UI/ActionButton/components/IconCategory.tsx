import { FC, memo, useMemo } from "react";
import { IconContext } from "react-icons";
import { BiLogOutCircle } from "react-icons/bi";
import { RiUser4Fill, RiMessage3Fill } from "react-icons/ri";

const IconCategory: FC<IconProvider> = ({ iconName, className }) => {
  const Icon = useMemo(() => {
    switch (iconName) {
      case "Conversation": {
        return <RiMessage3Fill />;
      }
      case "Profiles": {
        return <RiUser4Fill floodColor={"red"} />;
      }
      case "Sign out": {
        return <BiLogOutCircle />;
      }
    }
  }, [iconName]);

  return (
    <IconContext.Provider value={{ size: "2em", className }}>
      {Icon}
    </IconContext.Provider>
  );
};

export default memo(IconCategory);
